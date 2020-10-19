package com.ppanticona.web.rest;

import com.ppanticona.domain.Autorizacion;
import com.ppanticona.repository.AutorizacionRepository;
import com.ppanticona.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.ppanticona.domain.Autorizacion}.
 */
@RestController
@RequestMapping("/api")
public class AutorizacionResource {

    private final Logger log = LoggerFactory.getLogger(AutorizacionResource.class);

    private static final String ENTITY_NAME = "autorizacion";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AutorizacionRepository autorizacionRepository;

    public AutorizacionResource(AutorizacionRepository autorizacionRepository) {
        this.autorizacionRepository = autorizacionRepository;
    }

    /**
     * {@code POST  /autorizacions} : Create a new autorizacion.
     *
     * @param autorizacion the autorizacion to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new autorizacion, or with status {@code 400 (Bad Request)} if the autorizacion has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/autorizacions")
    public ResponseEntity<Autorizacion> createAutorizacion(@Valid @RequestBody Autorizacion autorizacion) throws URISyntaxException {
        log.debug("REST request to save Autorizacion : {}", autorizacion);
        if (autorizacion.getId() != null) {
            throw new BadRequestAlertException("A new autorizacion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Autorizacion result = autorizacionRepository.save(autorizacion);
        return ResponseEntity.created(new URI("/api/autorizacions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId()))
            .body(result);
    }

    /**
     * {@code PUT  /autorizacions} : Updates an existing autorizacion.
     *
     * @param autorizacion the autorizacion to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated autorizacion,
     * or with status {@code 400 (Bad Request)} if the autorizacion is not valid,
     * or with status {@code 500 (Internal Server Error)} if the autorizacion couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/autorizacions")
    public ResponseEntity<Autorizacion> updateAutorizacion(@Valid @RequestBody Autorizacion autorizacion) throws URISyntaxException {
        log.debug("REST request to update Autorizacion : {}", autorizacion);
        if (autorizacion.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Autorizacion result = autorizacionRepository.save(autorizacion);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, autorizacion.getId()))
            .body(result);
    }

    /**
     * {@code GET  /autorizacions} : get all the autorizacions.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of autorizacions in body.
     */
    @GetMapping("/autorizacions")
    public List<Autorizacion> getAllAutorizacions() {
        log.debug("REST request to get all Autorizacions");
        return autorizacionRepository.findAll();
    }

    /**
     * {@code GET  /autorizacions/:id} : get the "id" autorizacion.
     *
     * @param id the id of the autorizacion to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the autorizacion, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/autorizacions/{id}")
    public ResponseEntity<Autorizacion> getAutorizacion(@PathVariable String id) {
        log.debug("REST request to get Autorizacion : {}", id);
        Optional<Autorizacion> autorizacion = autorizacionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(autorizacion);
    }

    /**
     * {@code DELETE  /autorizacions/:id} : delete the "id" autorizacion.
     *
     * @param id the id of the autorizacion to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/autorizacions/{id}")
    public ResponseEntity<Void> deleteAutorizacion(@PathVariable String id) {
        log.debug("REST request to delete Autorizacion : {}", id);
        autorizacionRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id)).build();
    }
}
