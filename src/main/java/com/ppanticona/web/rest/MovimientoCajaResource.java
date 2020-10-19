package com.ppanticona.web.rest;

import com.ppanticona.domain.MovimientoCaja;
import com.ppanticona.repository.MovimientoCajaRepository;
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
 * REST controller for managing {@link com.ppanticona.domain.MovimientoCaja}.
 */
@RestController
@RequestMapping("/api")
public class MovimientoCajaResource {

    private final Logger log = LoggerFactory.getLogger(MovimientoCajaResource.class);

    private static final String ENTITY_NAME = "movimientoCaja";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MovimientoCajaRepository movimientoCajaRepository;

    public MovimientoCajaResource(MovimientoCajaRepository movimientoCajaRepository) {
        this.movimientoCajaRepository = movimientoCajaRepository;
    }

    /**
     * {@code POST  /movimiento-cajas} : Create a new movimientoCaja.
     *
     * @param movimientoCaja the movimientoCaja to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new movimientoCaja, or with status {@code 400 (Bad Request)} if the movimientoCaja has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/movimiento-cajas")
    public ResponseEntity<MovimientoCaja> createMovimientoCaja(@Valid @RequestBody MovimientoCaja movimientoCaja) throws URISyntaxException {
        log.debug("REST request to save MovimientoCaja : {}", movimientoCaja);
        if (movimientoCaja.getId() != null) {
            throw new BadRequestAlertException("A new movimientoCaja cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MovimientoCaja result = movimientoCajaRepository.save(movimientoCaja);
        return ResponseEntity.created(new URI("/api/movimiento-cajas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId()))
            .body(result);
    }

    /**
     * {@code PUT  /movimiento-cajas} : Updates an existing movimientoCaja.
     *
     * @param movimientoCaja the movimientoCaja to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated movimientoCaja,
     * or with status {@code 400 (Bad Request)} if the movimientoCaja is not valid,
     * or with status {@code 500 (Internal Server Error)} if the movimientoCaja couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/movimiento-cajas")
    public ResponseEntity<MovimientoCaja> updateMovimientoCaja(@Valid @RequestBody MovimientoCaja movimientoCaja) throws URISyntaxException {
        log.debug("REST request to update MovimientoCaja : {}", movimientoCaja);
        if (movimientoCaja.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MovimientoCaja result = movimientoCajaRepository.save(movimientoCaja);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, movimientoCaja.getId()))
            .body(result);
    }

    /**
     * {@code GET  /movimiento-cajas} : get all the movimientoCajas.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of movimientoCajas in body.
     */
    @GetMapping("/movimiento-cajas")
    public List<MovimientoCaja> getAllMovimientoCajas() {
        log.debug("REST request to get all MovimientoCajas");
        return movimientoCajaRepository.findAll();
    }

    /**
     * {@code GET  /movimiento-cajas/:id} : get the "id" movimientoCaja.
     *
     * @param id the id of the movimientoCaja to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the movimientoCaja, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/movimiento-cajas/{id}")
    public ResponseEntity<MovimientoCaja> getMovimientoCaja(@PathVariable String id) {
        log.debug("REST request to get MovimientoCaja : {}", id);
        Optional<MovimientoCaja> movimientoCaja = movimientoCajaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(movimientoCaja);
    }

    /**
     * {@code DELETE  /movimiento-cajas/:id} : delete the "id" movimientoCaja.
     *
     * @param id the id of the movimientoCaja to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/movimiento-cajas/{id}")
    public ResponseEntity<Void> deleteMovimientoCaja(@PathVariable String id) {
        log.debug("REST request to delete MovimientoCaja : {}", id);
        movimientoCajaRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id)).build();
    }
}
