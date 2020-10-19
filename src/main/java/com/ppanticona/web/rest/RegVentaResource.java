package com.ppanticona.web.rest;

import com.ppanticona.domain.RegVenta;
import com.ppanticona.repository.RegVentaRepository;
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
 * REST controller for managing {@link com.ppanticona.domain.RegVenta}.
 */
@RestController
@RequestMapping("/api")
public class RegVentaResource {

    private final Logger log = LoggerFactory.getLogger(RegVentaResource.class);

    private static final String ENTITY_NAME = "regVenta";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RegVentaRepository regVentaRepository;

    public RegVentaResource(RegVentaRepository regVentaRepository) {
        this.regVentaRepository = regVentaRepository;
    }

    /**
     * {@code POST  /reg-ventas} : Create a new regVenta.
     *
     * @param regVenta the regVenta to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new regVenta, or with status {@code 400 (Bad Request)} if the regVenta has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/reg-ventas")
    public ResponseEntity<RegVenta> createRegVenta(@Valid @RequestBody RegVenta regVenta) throws URISyntaxException {
        log.debug("REST request to save RegVenta : {}", regVenta);
        if (regVenta.getId() != null) {
            throw new BadRequestAlertException("A new regVenta cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RegVenta result = regVentaRepository.save(regVenta);
        return ResponseEntity.created(new URI("/api/reg-ventas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId()))
            .body(result);
    }

    /**
     * {@code PUT  /reg-ventas} : Updates an existing regVenta.
     *
     * @param regVenta the regVenta to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated regVenta,
     * or with status {@code 400 (Bad Request)} if the regVenta is not valid,
     * or with status {@code 500 (Internal Server Error)} if the regVenta couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/reg-ventas")
    public ResponseEntity<RegVenta> updateRegVenta(@Valid @RequestBody RegVenta regVenta) throws URISyntaxException {
        log.debug("REST request to update RegVenta : {}", regVenta);
        if (regVenta.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        RegVenta result = regVentaRepository.save(regVenta);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, regVenta.getId()))
            .body(result);
    }

    /**
     * {@code GET  /reg-ventas} : get all the regVentas.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of regVentas in body.
     */
    @GetMapping("/reg-ventas")
    public List<RegVenta> getAllRegVentas() {
        log.debug("REST request to get all RegVentas");
        return regVentaRepository.findAll();
    }

    /**
     * {@code GET  /reg-ventas/:id} : get the "id" regVenta.
     *
     * @param id the id of the regVenta to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the regVenta, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/reg-ventas/{id}")
    public ResponseEntity<RegVenta> getRegVenta(@PathVariable String id) {
        log.debug("REST request to get RegVenta : {}", id);
        Optional<RegVenta> regVenta = regVentaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(regVenta);
    }

    /**
     * {@code DELETE  /reg-ventas/:id} : delete the "id" regVenta.
     *
     * @param id the id of the regVenta to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/reg-ventas/{id}")
    public ResponseEntity<Void> deleteRegVenta(@PathVariable String id) {
        log.debug("REST request to delete RegVenta : {}", id);
        regVentaRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id)).build();
    }
}
