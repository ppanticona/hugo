package com.ppanticona.web.rest;

import com.ppanticona.HugoApp;
import com.ppanticona.domain.Promocion;
import com.ppanticona.repository.PromocionRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.util.Base64Utils;

import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static com.ppanticona.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link PromocionResource} REST controller.
 */
@SpringBootTest(classes = HugoApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class PromocionResourceIT {

    private static final String DEFAULT_TIP_PROMOCION = "AAAAAAAAAA";
    private static final String UPDATED_TIP_PROMOCION = "BBBBBBBBBB";

    private static final String DEFAULT_VAL_1 = "AAAAAAAAAA";
    private static final String UPDATED_VAL_1 = "BBBBBBBBBB";

    private static final String DEFAULT_VAL_2 = "AAAAAAAAAA";
    private static final String UPDATED_VAL_2 = "BBBBBBBBBB";

    private static final String DEFAULT_VAL_3 = "AAAAAAAAAA";
    private static final String UPDATED_VAL_3 = "BBBBBBBBBB";

    private static final String DEFAULT_MAX_PROM = "AAAAAAAAAA";
    private static final String UPDATED_MAX_PROM = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_FEC_INI_VIG = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_FEC_INI_VIG = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_FEC_FIN_VIG = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_FEC_FIN_VIG = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_COMENTARIOS = "AAAAAAAAAA";
    private static final String UPDATED_COMENTARIOS = "BBBBBBBBBB";

    private static final String DEFAULT_ESTADO = "AAAAAAAAAA";
    private static final String UPDATED_ESTADO = "BBBBBBBBBB";

    private static final Integer DEFAULT_VERSION = 1;
    private static final Integer UPDATED_VERSION = 2;

    private static final Boolean DEFAULT_IND_DEL = false;
    private static final Boolean UPDATED_IND_DEL = true;

    private static final ZonedDateTime DEFAULT_FEC_CREA = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_FEC_CREA = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_USU_CREA = "AAAAAAAAAA";
    private static final String UPDATED_USU_CREA = "BBBBBBBBBB";

    private static final String DEFAULT_IP_CREA = "AAAAAAAAAA";
    private static final String UPDATED_IP_CREA = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_FEC_MODIF = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_FEC_MODIF = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_USU_MODIF = "AAAAAAAAAA";
    private static final String UPDATED_USU_MODIF = "BBBBBBBBBB";

    private static final String DEFAULT_IP_MODIF = "AAAAAAAAAA";
    private static final String UPDATED_IP_MODIF = "BBBBBBBBBB";

    @Autowired
    private PromocionRepository promocionRepository;

    @Autowired
    private MockMvc restPromocionMockMvc;

    private Promocion promocion;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Promocion createEntity() {
        Promocion promocion = new Promocion()
            .tipPromocion(DEFAULT_TIP_PROMOCION)
            .val1(DEFAULT_VAL_1)
            .val2(DEFAULT_VAL_2)
            .val3(DEFAULT_VAL_3)
            .maxProm(DEFAULT_MAX_PROM)
            .fecIniVig(DEFAULT_FEC_INI_VIG)
            .fecFinVig(DEFAULT_FEC_FIN_VIG)
            .comentarios(DEFAULT_COMENTARIOS)
            .estado(DEFAULT_ESTADO)
            .version(DEFAULT_VERSION)
            .indDel(DEFAULT_IND_DEL)
            .fecCrea(DEFAULT_FEC_CREA)
            .usuCrea(DEFAULT_USU_CREA)
            .ipCrea(DEFAULT_IP_CREA)
            .fecModif(DEFAULT_FEC_MODIF)
            .usuModif(DEFAULT_USU_MODIF)
            .ipModif(DEFAULT_IP_MODIF);
        return promocion;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Promocion createUpdatedEntity() {
        Promocion promocion = new Promocion()
            .tipPromocion(UPDATED_TIP_PROMOCION)
            .val1(UPDATED_VAL_1)
            .val2(UPDATED_VAL_2)
            .val3(UPDATED_VAL_3)
            .maxProm(UPDATED_MAX_PROM)
            .fecIniVig(UPDATED_FEC_INI_VIG)
            .fecFinVig(UPDATED_FEC_FIN_VIG)
            .comentarios(UPDATED_COMENTARIOS)
            .estado(UPDATED_ESTADO)
            .version(UPDATED_VERSION)
            .indDel(UPDATED_IND_DEL)
            .fecCrea(UPDATED_FEC_CREA)
            .usuCrea(UPDATED_USU_CREA)
            .ipCrea(UPDATED_IP_CREA)
            .fecModif(UPDATED_FEC_MODIF)
            .usuModif(UPDATED_USU_MODIF)
            .ipModif(UPDATED_IP_MODIF);
        return promocion;
    }

    @BeforeEach
    public void initTest() {
        promocionRepository.deleteAll();
        promocion = createEntity();
    }

    @Test
    public void createPromocion() throws Exception {
        int databaseSizeBeforeCreate = promocionRepository.findAll().size();
        // Create the Promocion
        restPromocionMockMvc.perform(post("/api/promocions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(promocion)))
            .andExpect(status().isCreated());

        // Validate the Promocion in the database
        List<Promocion> promocionList = promocionRepository.findAll();
        assertThat(promocionList).hasSize(databaseSizeBeforeCreate + 1);
        Promocion testPromocion = promocionList.get(promocionList.size() - 1);
        assertThat(testPromocion.getTipPromocion()).isEqualTo(DEFAULT_TIP_PROMOCION);
        assertThat(testPromocion.getVal1()).isEqualTo(DEFAULT_VAL_1);
        assertThat(testPromocion.getVal2()).isEqualTo(DEFAULT_VAL_2);
        assertThat(testPromocion.getVal3()).isEqualTo(DEFAULT_VAL_3);
        assertThat(testPromocion.getMaxProm()).isEqualTo(DEFAULT_MAX_PROM);
        assertThat(testPromocion.getFecIniVig()).isEqualTo(DEFAULT_FEC_INI_VIG);
        assertThat(testPromocion.getFecFinVig()).isEqualTo(DEFAULT_FEC_FIN_VIG);
        assertThat(testPromocion.getComentarios()).isEqualTo(DEFAULT_COMENTARIOS);
        assertThat(testPromocion.getEstado()).isEqualTo(DEFAULT_ESTADO);
        assertThat(testPromocion.getVersion()).isEqualTo(DEFAULT_VERSION);
        assertThat(testPromocion.isIndDel()).isEqualTo(DEFAULT_IND_DEL);
        assertThat(testPromocion.getFecCrea()).isEqualTo(DEFAULT_FEC_CREA);
        assertThat(testPromocion.getUsuCrea()).isEqualTo(DEFAULT_USU_CREA);
        assertThat(testPromocion.getIpCrea()).isEqualTo(DEFAULT_IP_CREA);
        assertThat(testPromocion.getFecModif()).isEqualTo(DEFAULT_FEC_MODIF);
        assertThat(testPromocion.getUsuModif()).isEqualTo(DEFAULT_USU_MODIF);
        assertThat(testPromocion.getIpModif()).isEqualTo(DEFAULT_IP_MODIF);
    }

    @Test
    public void createPromocionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = promocionRepository.findAll().size();

        // Create the Promocion with an existing ID
        promocion.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restPromocionMockMvc.perform(post("/api/promocions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(promocion)))
            .andExpect(status().isBadRequest());

        // Validate the Promocion in the database
        List<Promocion> promocionList = promocionRepository.findAll();
        assertThat(promocionList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    public void checkTipPromocionIsRequired() throws Exception {
        int databaseSizeBeforeTest = promocionRepository.findAll().size();
        // set the field null
        promocion.setTipPromocion(null);

        // Create the Promocion, which fails.


        restPromocionMockMvc.perform(post("/api/promocions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(promocion)))
            .andExpect(status().isBadRequest());

        List<Promocion> promocionList = promocionRepository.findAll();
        assertThat(promocionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkFecIniVigIsRequired() throws Exception {
        int databaseSizeBeforeTest = promocionRepository.findAll().size();
        // set the field null
        promocion.setFecIniVig(null);

        // Create the Promocion, which fails.


        restPromocionMockMvc.perform(post("/api/promocions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(promocion)))
            .andExpect(status().isBadRequest());

        List<Promocion> promocionList = promocionRepository.findAll();
        assertThat(promocionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkFecFinVigIsRequired() throws Exception {
        int databaseSizeBeforeTest = promocionRepository.findAll().size();
        // set the field null
        promocion.setFecFinVig(null);

        // Create the Promocion, which fails.


        restPromocionMockMvc.perform(post("/api/promocions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(promocion)))
            .andExpect(status().isBadRequest());

        List<Promocion> promocionList = promocionRepository.findAll();
        assertThat(promocionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkEstadoIsRequired() throws Exception {
        int databaseSizeBeforeTest = promocionRepository.findAll().size();
        // set the field null
        promocion.setEstado(null);

        // Create the Promocion, which fails.


        restPromocionMockMvc.perform(post("/api/promocions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(promocion)))
            .andExpect(status().isBadRequest());

        List<Promocion> promocionList = promocionRepository.findAll();
        assertThat(promocionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkVersionIsRequired() throws Exception {
        int databaseSizeBeforeTest = promocionRepository.findAll().size();
        // set the field null
        promocion.setVersion(null);

        // Create the Promocion, which fails.


        restPromocionMockMvc.perform(post("/api/promocions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(promocion)))
            .andExpect(status().isBadRequest());

        List<Promocion> promocionList = promocionRepository.findAll();
        assertThat(promocionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkIndDelIsRequired() throws Exception {
        int databaseSizeBeforeTest = promocionRepository.findAll().size();
        // set the field null
        promocion.setIndDel(null);

        // Create the Promocion, which fails.


        restPromocionMockMvc.perform(post("/api/promocions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(promocion)))
            .andExpect(status().isBadRequest());

        List<Promocion> promocionList = promocionRepository.findAll();
        assertThat(promocionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkFecCreaIsRequired() throws Exception {
        int databaseSizeBeforeTest = promocionRepository.findAll().size();
        // set the field null
        promocion.setFecCrea(null);

        // Create the Promocion, which fails.


        restPromocionMockMvc.perform(post("/api/promocions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(promocion)))
            .andExpect(status().isBadRequest());

        List<Promocion> promocionList = promocionRepository.findAll();
        assertThat(promocionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkUsuCreaIsRequired() throws Exception {
        int databaseSizeBeforeTest = promocionRepository.findAll().size();
        // set the field null
        promocion.setUsuCrea(null);

        // Create the Promocion, which fails.


        restPromocionMockMvc.perform(post("/api/promocions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(promocion)))
            .andExpect(status().isBadRequest());

        List<Promocion> promocionList = promocionRepository.findAll();
        assertThat(promocionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkIpCreaIsRequired() throws Exception {
        int databaseSizeBeforeTest = promocionRepository.findAll().size();
        // set the field null
        promocion.setIpCrea(null);

        // Create the Promocion, which fails.


        restPromocionMockMvc.perform(post("/api/promocions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(promocion)))
            .andExpect(status().isBadRequest());

        List<Promocion> promocionList = promocionRepository.findAll();
        assertThat(promocionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void getAllPromocions() throws Exception {
        // Initialize the database
        promocionRepository.save(promocion);

        // Get all the promocionList
        restPromocionMockMvc.perform(get("/api/promocions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(promocion.getId())))
            .andExpect(jsonPath("$.[*].tipPromocion").value(hasItem(DEFAULT_TIP_PROMOCION)))
            .andExpect(jsonPath("$.[*].val1").value(hasItem(DEFAULT_VAL_1)))
            .andExpect(jsonPath("$.[*].val2").value(hasItem(DEFAULT_VAL_2)))
            .andExpect(jsonPath("$.[*].val3").value(hasItem(DEFAULT_VAL_3)))
            .andExpect(jsonPath("$.[*].maxProm").value(hasItem(DEFAULT_MAX_PROM)))
            .andExpect(jsonPath("$.[*].fecIniVig").value(hasItem(sameInstant(DEFAULT_FEC_INI_VIG))))
            .andExpect(jsonPath("$.[*].fecFinVig").value(hasItem(sameInstant(DEFAULT_FEC_FIN_VIG))))
            .andExpect(jsonPath("$.[*].comentarios").value(hasItem(DEFAULT_COMENTARIOS.toString())))
            .andExpect(jsonPath("$.[*].estado").value(hasItem(DEFAULT_ESTADO)))
            .andExpect(jsonPath("$.[*].version").value(hasItem(DEFAULT_VERSION)))
            .andExpect(jsonPath("$.[*].indDel").value(hasItem(DEFAULT_IND_DEL.booleanValue())))
            .andExpect(jsonPath("$.[*].fecCrea").value(hasItem(sameInstant(DEFAULT_FEC_CREA))))
            .andExpect(jsonPath("$.[*].usuCrea").value(hasItem(DEFAULT_USU_CREA)))
            .andExpect(jsonPath("$.[*].ipCrea").value(hasItem(DEFAULT_IP_CREA)))
            .andExpect(jsonPath("$.[*].fecModif").value(hasItem(sameInstant(DEFAULT_FEC_MODIF))))
            .andExpect(jsonPath("$.[*].usuModif").value(hasItem(DEFAULT_USU_MODIF)))
            .andExpect(jsonPath("$.[*].ipModif").value(hasItem(DEFAULT_IP_MODIF)));
    }
    
    @Test
    public void getPromocion() throws Exception {
        // Initialize the database
        promocionRepository.save(promocion);

        // Get the promocion
        restPromocionMockMvc.perform(get("/api/promocions/{id}", promocion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(promocion.getId()))
            .andExpect(jsonPath("$.tipPromocion").value(DEFAULT_TIP_PROMOCION))
            .andExpect(jsonPath("$.val1").value(DEFAULT_VAL_1))
            .andExpect(jsonPath("$.val2").value(DEFAULT_VAL_2))
            .andExpect(jsonPath("$.val3").value(DEFAULT_VAL_3))
            .andExpect(jsonPath("$.maxProm").value(DEFAULT_MAX_PROM))
            .andExpect(jsonPath("$.fecIniVig").value(sameInstant(DEFAULT_FEC_INI_VIG)))
            .andExpect(jsonPath("$.fecFinVig").value(sameInstant(DEFAULT_FEC_FIN_VIG)))
            .andExpect(jsonPath("$.comentarios").value(DEFAULT_COMENTARIOS.toString()))
            .andExpect(jsonPath("$.estado").value(DEFAULT_ESTADO))
            .andExpect(jsonPath("$.version").value(DEFAULT_VERSION))
            .andExpect(jsonPath("$.indDel").value(DEFAULT_IND_DEL.booleanValue()))
            .andExpect(jsonPath("$.fecCrea").value(sameInstant(DEFAULT_FEC_CREA)))
            .andExpect(jsonPath("$.usuCrea").value(DEFAULT_USU_CREA))
            .andExpect(jsonPath("$.ipCrea").value(DEFAULT_IP_CREA))
            .andExpect(jsonPath("$.fecModif").value(sameInstant(DEFAULT_FEC_MODIF)))
            .andExpect(jsonPath("$.usuModif").value(DEFAULT_USU_MODIF))
            .andExpect(jsonPath("$.ipModif").value(DEFAULT_IP_MODIF));
    }
    @Test
    public void getNonExistingPromocion() throws Exception {
        // Get the promocion
        restPromocionMockMvc.perform(get("/api/promocions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updatePromocion() throws Exception {
        // Initialize the database
        promocionRepository.save(promocion);

        int databaseSizeBeforeUpdate = promocionRepository.findAll().size();

        // Update the promocion
        Promocion updatedPromocion = promocionRepository.findById(promocion.getId()).get();
        updatedPromocion
            .tipPromocion(UPDATED_TIP_PROMOCION)
            .val1(UPDATED_VAL_1)
            .val2(UPDATED_VAL_2)
            .val3(UPDATED_VAL_3)
            .maxProm(UPDATED_MAX_PROM)
            .fecIniVig(UPDATED_FEC_INI_VIG)
            .fecFinVig(UPDATED_FEC_FIN_VIG)
            .comentarios(UPDATED_COMENTARIOS)
            .estado(UPDATED_ESTADO)
            .version(UPDATED_VERSION)
            .indDel(UPDATED_IND_DEL)
            .fecCrea(UPDATED_FEC_CREA)
            .usuCrea(UPDATED_USU_CREA)
            .ipCrea(UPDATED_IP_CREA)
            .fecModif(UPDATED_FEC_MODIF)
            .usuModif(UPDATED_USU_MODIF)
            .ipModif(UPDATED_IP_MODIF);

        restPromocionMockMvc.perform(put("/api/promocions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedPromocion)))
            .andExpect(status().isOk());

        // Validate the Promocion in the database
        List<Promocion> promocionList = promocionRepository.findAll();
        assertThat(promocionList).hasSize(databaseSizeBeforeUpdate);
        Promocion testPromocion = promocionList.get(promocionList.size() - 1);
        assertThat(testPromocion.getTipPromocion()).isEqualTo(UPDATED_TIP_PROMOCION);
        assertThat(testPromocion.getVal1()).isEqualTo(UPDATED_VAL_1);
        assertThat(testPromocion.getVal2()).isEqualTo(UPDATED_VAL_2);
        assertThat(testPromocion.getVal3()).isEqualTo(UPDATED_VAL_3);
        assertThat(testPromocion.getMaxProm()).isEqualTo(UPDATED_MAX_PROM);
        assertThat(testPromocion.getFecIniVig()).isEqualTo(UPDATED_FEC_INI_VIG);
        assertThat(testPromocion.getFecFinVig()).isEqualTo(UPDATED_FEC_FIN_VIG);
        assertThat(testPromocion.getComentarios()).isEqualTo(UPDATED_COMENTARIOS);
        assertThat(testPromocion.getEstado()).isEqualTo(UPDATED_ESTADO);
        assertThat(testPromocion.getVersion()).isEqualTo(UPDATED_VERSION);
        assertThat(testPromocion.isIndDel()).isEqualTo(UPDATED_IND_DEL);
        assertThat(testPromocion.getFecCrea()).isEqualTo(UPDATED_FEC_CREA);
        assertThat(testPromocion.getUsuCrea()).isEqualTo(UPDATED_USU_CREA);
        assertThat(testPromocion.getIpCrea()).isEqualTo(UPDATED_IP_CREA);
        assertThat(testPromocion.getFecModif()).isEqualTo(UPDATED_FEC_MODIF);
        assertThat(testPromocion.getUsuModif()).isEqualTo(UPDATED_USU_MODIF);
        assertThat(testPromocion.getIpModif()).isEqualTo(UPDATED_IP_MODIF);
    }

    @Test
    public void updateNonExistingPromocion() throws Exception {
        int databaseSizeBeforeUpdate = promocionRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPromocionMockMvc.perform(put("/api/promocions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(promocion)))
            .andExpect(status().isBadRequest());

        // Validate the Promocion in the database
        List<Promocion> promocionList = promocionRepository.findAll();
        assertThat(promocionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deletePromocion() throws Exception {
        // Initialize the database
        promocionRepository.save(promocion);

        int databaseSizeBeforeDelete = promocionRepository.findAll().size();

        // Delete the promocion
        restPromocionMockMvc.perform(delete("/api/promocions/{id}", promocion.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Promocion> promocionList = promocionRepository.findAll();
        assertThat(promocionList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
