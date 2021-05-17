package com.example.demo.controller;

import com.example.demo.models.*;
import com.example.demo.repository.*;
import com.example.demo.security.services.PostService;
import javassist.NotFoundException;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.security.Principal;
import java.util.List;
import java.util.Optional;
import java.util.zip.DataFormatException;
import java.util.zip.Deflater;
import java.util.zip.Inflater;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/post/")
public class PostController {
    private static String UPLOAD_DIR = "image";

    @Autowired
    private PostRepository postRepository;
    @Autowired
    private TagRepository tagRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PostService postService;
    @Autowired
    private ImageRepository imageRepository;
    @Autowired
    private KotobaRepository kotobaRepository;

    @GetMapping(value = "kotoba", produces = "application/json")
    public ResponseEntity<List<Kotoba>> getKotoba(){
        return ResponseEntity.ok(kotobaRepository.findAll());
    }

    @GetMapping(path = { "/download/{imageName}" })
    public Image getImage(@PathVariable("imageName") String imageName) throws IOException {

        final Optional<Image> retrievedImage = imageRepository.findByName(imageName);
        Image img = new Image(retrievedImage.get().getName(), retrievedImage.get().getType(),
                decompressBytes(retrievedImage.get().getPicByte()));
        return img;
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping(value = "excel-file", produces = "application/json")
    public ResponseEntity<?> uploadExcelFile(@RequestParam("file") MultipartFile file) throws IOException {
        XSSFWorkbook workbook = new XSSFWorkbook(file.getInputStream());
        XSSFSheet worksheet = workbook.getSheetAt(0);

        for (int index = 0; index < worksheet.getPhysicalNumberOfRows(); index++) {
            if (index > 0) {
                Kotoba kotoba = new Kotoba();

                XSSFRow row = worksheet.getRow(index);
                kotoba.setKanji(row.getCell(1).getStringCellValue());
                if(kotobaRepository.findByKanji(kotoba.getKanji()) == null){
                    kotoba.setYomikata(row.getCell(0).getStringCellValue());
                    kotoba.setImi(row.getCell(2).getStringCellValue());
                    kotoba.setRei(row.getCell(3).getStringCellValue());
                    kotoba.setIminorei(row.getCell(4).getStringCellValue());
                    kotobaRepository.save(kotoba);
                }else {

                }

            }
        }
        return ResponseEntity.ok(200);
    }

    @PostMapping("/upload")
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file, Principal principal) throws IOException {
        if(imageRepository.findByName(file.getOriginalFilename()) != null){
            Image img = new Image(file.getOriginalFilename(), file.getContentType(), file.getBytes());
            imageRepository.save(img);
            return ResponseEntity.ok(200);
        }else
        {
            return null;
        }


    }


    @GetMapping(value = "/all", produces = "application/json")
    public ResponseEntity<Page<Post>> getAll(@RequestParam(name = "page", defaultValue = "0") int page,
                                             @RequestParam(name = "limit", defaultValue = "10") int limit){
        PageRequest pageRequest = PageRequest.of(page, limit, Sort.by("id"));
        Page<Post> pageResult = postRepository.findAll(pageRequest);
        return ResponseEntity.ok(pageResult);
    }

    @GetMapping(value = "/allPost/{userId}", produces = "application/json")
    public ResponseEntity<List<Post>> getAllPostByUser(@PathVariable Long userId){
        List<Post> posts =  postRepository.findByUserId(userId);
        return ResponseEntity.ok(posts);
    }

    @GetMapping(value = "/getTag", produces = "application/json")
    public ResponseEntity<List<Tag>> getAllTag(){
        return ResponseEntity.ok(tagRepository.findAll());
    }

    @PostMapping(value = "/create", produces={"application/json"})
    public ResponseEntity<?> createPost(@RequestBody Post post, Principal principal){
        User user = userRepository.findByUsername(principal.getName()).get();
        post.setUser(user);
        return ResponseEntity.ok(postRepository.save(post));
    }

    @GetMapping(value = "/detail/{id}", produces = "application/json")
    public ResponseEntity<Post> getPostByID(@PathVariable Long id){
        Post post = postRepository.findById(id).get();
        return ResponseEntity.ok(post);
    }

    @PutMapping(value = "/edit/{id}", produces = "application/json")
    public ResponseEntity<Post> editPostById(@PathVariable Long id, @RequestBody Post updatePost){
        Post post = postRepository.findById(id).get();
        if(post != null){
            post.setTitle(updatePost.getTitle());
            post.setContent(updatePost.getContent());
            post.setTags(updatePost.getTags());
            return ResponseEntity.ok(postRepository.save(post));
        }else{
            return ResponseEntity.ok(postRepository.save(post));
        }
    }

    @DeleteMapping(value = "/delete/{id}", produces = "application/json")
    public ResponseEntity<?> deletePostById(@PathVariable Long id){
        postRepository.deleteById(id);
        return ResponseEntity.ok(200);
    }

    // compress the image bytes before storing it in the database
    public static byte[] compressBytes(byte[] data) {
        Deflater deflater = new Deflater();
        deflater.setInput(data);
        deflater.finish();

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[1024];
        while (!deflater.finished()) {
            int count = deflater.deflate(buffer);
            outputStream.write(buffer, 0, count);
        }
        try {
            outputStream.close();
        } catch (IOException e) {
        }
        System.out.println("Compressed Image Byte Size - " + outputStream.toByteArray().length);

        return outputStream.toByteArray();
    }

    // uncompress the image bytes before returning it to the angular application
    public static byte[] decompressBytes(byte[] data) {
        Inflater inflater = new Inflater();
        inflater.setInput(data);
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[1024];
        try {
            while (!inflater.finished()) {
                int count = inflater.inflate(buffer);
                outputStream.write(buffer, 0, count);
            }
            outputStream.close();
        } catch (IOException ioe) {
        } catch (DataFormatException e) {
        }
        return outputStream.toByteArray();
    }

}
