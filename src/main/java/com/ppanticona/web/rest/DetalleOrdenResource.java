package com.ppanticona.web.rest;

import com.ppanticona.domain.DetalleOrden;
import com.ppanticona.repository.DetalleOrdenRepository;
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
 * REST controller for managing {@link com.ppanticona.domain.DetalleOrden}.
 */
@RestController
@RequestMapping("/api")
public class DetalleOrdenResource {

    private final Logger log = LoggerFactory.getLogger(DetalleOrdenResource.class);

    private static final String ENTITY_NAME = "detalleOrden";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DetalleOrdenRepository detalleOrdenRepository;

    public DetalleOrdenResource(DetalleOrdenRepository detalleOrdenRepository) {
        this.detalleOrdenRepository = detalleOrdenRepository;
    }

    /**
     * {@code POST  /detalle-ordens} : Create a new detalleOrden.
     *
     * @param detalleOrden the detalleOrden to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new detalleOrden, or with status {@code 400 (Bad Request)} if the detalleOrden has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/detalle-ordens")
    public ResponseEntity<DetalleOrden> createDetalleOrden(@Valid @RequestBody DetalleOrden detalleOrden) throws URISyntaxException {
        log.debug("REST request to save DetalleOrden : {}", detalleOrden);
        if (detalleOrden.getId() != null) {
            throw new BadRequestAlertException("A new detalleOrden cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DetalleOrden result = detalleOrdenRepository.save(detalleOrden);
        return ResponseEntity.created(new URI("/api/detalle-ordens/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId()))
            .body(result);
    }

    /**
     * {@code PUT  /detalle-ordens} : Updates an existing detalleOrden.
     *
     * @param detalleOrden the detalleOrden to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated detalleOrden,
     * or with status {@code 400 (Bad Request)} if the detalleOrden is not valid,
     * or with status {@code 500 (Internal Server Error)} if the detalleOrden couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/detalle-ordens")
    public ResponseEntity<DetalleOrden> updateDetalleOrden(@Valid @RequestBody DetalleOrden detalleOrden) throws URISyntaxException {
        log.debug("REST request to update DetalleOrden : {}", detalleOrden);
        if (detalleOrden.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DetalleOrden result = detalleOrdenRepository.save(detalleOrden);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, detalleOrden.getId()))
            .body(result);
    }

    /**
     * {@code GET  /detalle-ordens} : get all the detalleOrdens.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of detalleOrdens in body.
     */
    @GetMapping("/detalle-ordens")
    public List<DetalleOrden> getAllDetalleOrdens() {
        log.debug("REST request to get all DetalleOrdens");
        return detalleOrdenRepository.findAll();
    }

    /**
     * {@code GET  /detalle-ordens/:id} : get the "id" detalleOrden.
     *
     * @param id the id of the detalleOrden to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the detalleOrden, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/detalle-ordens/{id}")
    public ResponseEntity<DetalleOrden> getDetalleOrden(@PathVariable String id) {
        log.debug("REST request to get DetalleOrden : {}", id);
        Optional<DetalleOrden> detalleOrden = detalleOrdenRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(detalleOrden);
    }

    /**
     * {@code DELETE  /detalle-ordens/:id} : delete the "id" detalleOrden.
     *
     * @param id the id of the detalleOrden to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/detalle-ordens/{id}")
    public ResponseEntity<Void> deleteDetalleOrden(@PathVariable String id) {
        log.debug("REST request to delete DetalleOrden : {}", id);
        detalleOrdenRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id)).build();
    }
}
