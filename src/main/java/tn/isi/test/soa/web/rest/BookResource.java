package tn.isi.test.soa.web.rest;

import tn.isi.test.soa.domain.Book;
import tn.isi.test.soa.repository.BookRepository;
import tn.isi.test.soa.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link tn.isi.test.soa.domain.Book}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class BookResource {

    private final Logger log = LoggerFactory.getLogger(BookResource.class);

    private static final String ENTITY_NAME = "book";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final BookRepository bookRepository;

    public BookResource(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    /**
     * {@code POST  /books} : Create a new book.
     *
     * @param book the book to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new book, or with status {@code 400 (Bad Request)} if the book has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/books")
    public ResponseEntity<Book> createBook(@RequestBody Book book) throws URISyntaxException {
        log.debug("REST request to save Book : {}", book);
        if (book.getId() != null) {
            throw new BadRequestAlertException("A new book cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Book result = bookRepository.save(book);
        return ResponseEntity.created(new URI("/api/books/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /books} : Updates an existing book.
     *
     * @param book the book to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated book,
     * or with status {@code 400 (Bad Request)} if the book is not valid,
     * or with status {@code 500 (Internal Server Error)} if the book couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/books")
    public ResponseEntity<Book> updateBook(@RequestBody Book book) throws URISyntaxException {
        log.debug("REST request to update Book : {}", book);
        if (book.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Book result = bookRepository.save(book);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, book.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /books} : get all the books.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of books in body.
     */
    @GetMapping("/books")
    public List<Book> getAllBooks() {
        log.debug("REST request to get all Books");
        return bookRepository.findAll();
    }

    /**
     * {@code GET  /books/:id} : get the "id" book.
     *
     * @param id the id of the book to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the book, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/books/{id}")
    public ResponseEntity<Book> getBook(@PathVariable Long id) {
        log.debug("REST request to get Book : {}", id);
        Optional<Book> book = bookRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(book);
    }

    /**
     * {@code DELETE  /books/:id} : delete the "id" book.
     *
     * @param id the id of the book to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/books/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable Long id) {
        log.debug("REST request to delete Book : {}", id);
        bookRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
