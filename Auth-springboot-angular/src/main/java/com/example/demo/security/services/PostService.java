package com.example.demo.security.services;

import com.example.demo.models.Post;
import org.hibernate.CacheMode;
import org.hibernate.search.mapper.orm.Search;
import org.hibernate.search.mapper.orm.massindexing.MassIndexer;
import org.hibernate.search.mapper.orm.session.SearchSession;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Service
public class PostService {

    @PersistenceContext
    private EntityManager em;


    public List<Post> searchPost(String terms, int limit, int offset) {
        return Search.session(em).search(Post.class).where(f -> f.match().fields("title", "content").matching("admin"))
                .fetchHits(offset, limit);
    }

}
