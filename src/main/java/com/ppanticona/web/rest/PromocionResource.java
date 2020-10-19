package com.ppanticona.web.rest;

import com.ppanticona.domain.Promocion;
import com.ppanticona.repository.PromocionRepository;
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
 * REST controller for managing {@link com.ppanticona.domain.Promocion}.
 */
@RestController
@RequestMapping("/api")
public class PromocionResource {

    private final Logger log = LoggerFactory.getLogger(PromocionResource.class);

    private static final String ENTITY_NAME = "promocion";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PromocionRepository promocionRepository;

    public PromocionResource(PromocionRepository promocionRepository) {
        this.promocionRepository = promocionRepository;
    }

    /**
     * {@code POST  /promocions} : Create a new promocion.
     *
     * @param promocion the promocion to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new promocion, or with status {@code 400 (Bad Request)} if the promocion has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/promocions")
    public ResponseEntity<Promocion> createPromocion(@Valid @RequestBody Promocion promocion) throws URISyntaxException {
        log.debug("REST request to save Promocion : {}", promocion);
        if (promocion.getId() != null) {
            throw new BadRequestAlertException("A new promocion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Promocion result = promocionRepository.save(promocion);
        return ResponseEntity.created(new URI("/api/promocions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId()))
            .body(result);
    }

    /**
     * {@code PUT  /promocions} : Updates an existing promocion.
     *
     * @param promocion the promocion to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated promocion,
     * or with status {@code 400 (Bad Request)} if the promocion is not valid,
     * or with status {@code 500 (Internal Server Error)} if the promocion couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/promocions")
    public ResponseEntity<Promocion> updatePromocion(@Valid @RequestBody Promocion promocion) throws URISyntaxException {
        log.debug("REST request to update Promocion : {}", promocion);
        if (promocion.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Promocion result = promocionRepository.save(promocion);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, promocion.getId()))
            .body(result);
    }

    /**
     * {@code GET  /promocions} : get all the promocions.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of promocions in body.
     */
    @GetMapping("/promocions")
    public List<Promocion> getAllPromocions() {
        log.debug("REST request to get all Promocions");
        return promocionRepository.findAll();
    }

    /**
     * {@code GET  /promocions/:id} : get the "id" promocion.
     *
     * @param id the id of the promocion to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the promocion, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/promocions/{id}")
    public ResponseEntity<Promocion> getPromocion(@PathVariable String id) {
        log.debug("REST request to get Promocion : {}", id);
        Optional<Promocion> promocion = promocionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(promocion);
    }

    /**
     * {@code DELETE  /promocions/:id} : delete the "id" promocion.
     *
     * @param id the id of the promocion to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/promocions/{id}")
    public ResponseEntity<Void> deletePromocion(@PathVariable String id) {
        log.debug("REST request to delete Promocion : {}", id);
        promocionRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id)).build();
    }
}
