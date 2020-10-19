package com.ppanticona.web.rest;

import com.ppanticona.domain.Caja;
import com.ppanticona.repository.CajaRepository;
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
 * REST controller for managing {@link com.ppanticona.domain.Caja}.
 */
@RestController
@RequestMapping("/api")
public class CajaResource {

    private final Logger log = LoggerFactory.getLogger(CajaResource.class);

    private static final String ENTITY_NAME = "caja";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CajaRepository cajaRepository;

    public CajaResource(CajaRepository cajaRepository) {
        this.cajaRepository = cajaRepository;
    }

    /**
     * {@code POST  /cajas} : Create a new caja.
     *
     * @param caja the caja to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new caja, or with status {@code 400 (Bad Request)} if the caja has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/cajas")
    public ResponseEntity<Caja> createCaja(@Valid @RequestBody Caja caja) throws URISyntaxException {
        log.debug("REST request to save Caja : {}", caja);
        if (caja.getId() != null) {
            throw new BadRequestAlertException("A new caja cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Caja result = cajaRepository.save(caja);
        return ResponseEntity.created(new URI("/api/cajas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId()))
            .body(result);
    }

    /**
     * {@code PUT  /cajas} : Updates an existing caja.
     *
     * @param caja the caja to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated caja,
     * or with status {@code 400 (Bad Request)} if the caja is not valid,
     * or with status {@code 500 (Internal Server Error)} if the caja couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/cajas")
    public ResponseEntity<Caja> updateCaja(@Valid @RequestBody Caja caja) throws URISyntaxException {
        log.debug("REST request to update Caja : {}", caja);
        if (caja.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Caja result = cajaRepository.save(caja);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, caja.getId()))
            .body(result);
    }

    /**
     * {@code GET  /cajas} : get all the cajas.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of cajas in body.
     */
    @GetMapping("/cajas")
    public List<Caja> getAllCajas() {
        log.debug("REST request to get all Cajas");
        return cajaRepository.findAll();
    }

    /**
     * {@code GET  /cajas/:id} : get the "id" caja.
     *
     * @param id the id of the caja to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the caja, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/cajas/{id}")
    public ResponseEntity<Caja> getCaja(@PathVariable String id) {
        log.debug("REST request to get Caja : {}", id);
        Optional<Caja> caja = cajaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(caja);
    }

    /**
     * {@code DELETE  /cajas/:id} : delete the "id" caja.
     *
     * @param id the id of the caja to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/cajas/{id}")
    public ResponseEntity<Void> deleteCaja(@PathVariable String id) {
        log.debug("REST request to delete Caja : {}", id);
        cajaRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id)).build();
    }
}
