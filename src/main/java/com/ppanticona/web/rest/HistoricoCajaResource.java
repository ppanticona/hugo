package com.ppanticona.web.rest;

import com.ppanticona.domain.HistoricoCaja;
import com.ppanticona.repository.HistoricoCajaRepository;
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
 * REST controller for managing {@link com.ppanticona.domain.HistoricoCaja}.
 */
@RestController
@RequestMapping("/api")
public class HistoricoCajaResource {

    private final Logger log = LoggerFactory.getLogger(HistoricoCajaResource.class);

    private static final String ENTITY_NAME = "historicoCaja";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final HistoricoCajaRepository historicoCajaRepository;

    public HistoricoCajaResource(HistoricoCajaRepository historicoCajaRepository) {
        this.historicoCajaRepository = historicoCajaRepository;
    }

    /**
     * {@code POST  /historico-cajas} : Create a new historicoCaja.
     *
     * @param historicoCaja the historicoCaja to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new historicoCaja, or with status {@code 400 (Bad Request)} if the historicoCaja has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/historico-cajas")
    public ResponseEntity<HistoricoCaja> createHistoricoCaja(@Valid @RequestBody HistoricoCaja historicoCaja) throws URISyntaxException {
        log.debug("REST request to save HistoricoCaja : {}", historicoCaja);
        if (historicoCaja.getId() != null) {
            throw new BadRequestAlertException("A new historicoCaja cannot already have an ID", ENTITY_NAME, "idexists");
        }
        HistoricoCaja result = historicoCajaRepository.save(historicoCaja);
        return ResponseEntity.created(new URI("/api/historico-cajas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId()))
            .body(result);
    }

    /**
     * {@code PUT  /historico-cajas} : Updates an existing historicoCaja.
     *
     * @param historicoCaja the historicoCaja to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated historicoCaja,
     * or with status {@code 400 (Bad Request)} if the historicoCaja is not valid,
     * or with status {@code 500 (Internal Server Error)} if the historicoCaja couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/historico-cajas")
    public ResponseEntity<HistoricoCaja> updateHistoricoCaja(@Valid @RequestBody HistoricoCaja historicoCaja) throws URISyntaxException {
        log.debug("REST request to update HistoricoCaja : {}", historicoCaja);
        if (historicoCaja.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        HistoricoCaja result = historicoCajaRepository.save(historicoCaja);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, historicoCaja.getId()))
            .body(result);
    }

    /**
     * {@code GET  /historico-cajas} : get all the historicoCajas.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of historicoCajas in body.
     */
    @GetMapping("/historico-cajas")
    public List<HistoricoCaja> getAllHistoricoCajas() {
        log.debug("REST request to get all HistoricoCajas");
        return historicoCajaRepository.findAll();
    }

    /**
     * {@code GET  /historico-cajas/:id} : get the "id" historicoCaja.
     *
     * @param id the id of the historicoCaja to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the historicoCaja, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/historico-cajas/{id}")
    public ResponseEntity<HistoricoCaja> getHistoricoCaja(@PathVariable String id) {
        log.debug("REST request to get HistoricoCaja : {}", id);
        Optional<HistoricoCaja> historicoCaja = historicoCajaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(historicoCaja);
    }

    /**
     * {@code DELETE  /historico-cajas/:id} : delete the "id" historicoCaja.
     *
     * @param id the id of the historicoCaja to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/historico-cajas/{id}")
    public ResponseEntity<Void> deleteHistoricoCaja(@PathVariable String id) {
        log.debug("REST request to delete HistoricoCaja : {}", id);
        historicoCajaRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id)).build();
    }
}
