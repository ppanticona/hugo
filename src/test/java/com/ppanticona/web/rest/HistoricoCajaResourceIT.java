package com.ppanticona.web.rest;

import com.ppanticona.HugoApp;
import com.ppanticona.domain.HistoricoCaja;
import com.ppanticona.repository.HistoricoCajaRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

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
 * Integration tests for the {@link HistoricoCajaResource} REST controller.
 */
@SpringBootTest(classes = HugoApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class HistoricoCajaResourceIT {

    private static final ZonedDateTime DEFAULT_FEC_INI_VIG = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_FEC_INI_VIG = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_FEC_FIN_VIG = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_FEC_FIN_VIG = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

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
    private HistoricoCajaRepository historicoCajaRepository;

    @Autowired
    private MockMvc restHistoricoCajaMockMvc;

    private HistoricoCaja historicoCaja;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static HistoricoCaja createEntity() {
        HistoricoCaja historicoCaja = new HistoricoCaja()
            .fecIniVig(DEFAULT_FEC_INI_VIG)
            .fecFinVig(DEFAULT_FEC_FIN_VIG)
            .estado(DEFAULT_ESTADO)
            .version(DEFAULT_VERSION)
            .indDel(DEFAULT_IND_DEL)
            .fecCrea(DEFAULT_FEC_CREA)
            .usuCrea(DEFAULT_USU_CREA)
            .ipCrea(DEFAULT_IP_CREA)
            .fecModif(DEFAULT_FEC_MODIF)
            .usuModif(DEFAULT_USU_MODIF)
            .ipModif(DEFAULT_IP_MODIF);
        return historicoCaja;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static HistoricoCaja createUpdatedEntity() {
        HistoricoCaja historicoCaja = new HistoricoCaja()
            .fecIniVig(UPDATED_FEC_INI_VIG)
            .fecFinVig(UPDATED_FEC_FIN_VIG)
            .estado(UPDATED_ESTADO)
            .version(UPDATED_VERSION)
            .indDel(UPDATED_IND_DEL)
            .fecCrea(UPDATED_FEC_CREA)
            .usuCrea(UPDATED_USU_CREA)
            .ipCrea(UPDATED_IP_CREA)
            .fecModif(UPDATED_FEC_MODIF)
            .usuModif(UPDATED_USU_MODIF)
            .ipModif(UPDATED_IP_MODIF);
        return historicoCaja;
    }

    @BeforeEach
    public void initTest() {
        historicoCajaRepository.deleteAll();
        historicoCaja = createEntity();
    }

    @Test
    public void createHistoricoCaja() throws Exception {
        int databaseSizeBeforeCreate = historicoCajaRepository.findAll().size();
        // Create the HistoricoCaja
        restHistoricoCajaMockMvc.perform(post("/api/historico-cajas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(historicoCaja)))
            .andExpect(status().isCreated());

        // Validate the HistoricoCaja in the database
        List<HistoricoCaja> historicoCajaList = historicoCajaRepository.findAll();
        assertThat(historicoCajaList).hasSize(databaseSizeBeforeCreate + 1);
        HistoricoCaja testHistoricoCaja = historicoCajaList.get(historicoCajaList.size() - 1);
        assertThat(testHistoricoCaja.getFecIniVig()).isEqualTo(DEFAULT_FEC_INI_VIG);
        assertThat(testHistoricoCaja.getFecFinVig()).isEqualTo(DEFAULT_FEC_FIN_VIG);
        assertThat(testHistoricoCaja.getEstado()).isEqualTo(DEFAULT_ESTADO);
        assertThat(testHistoricoCaja.getVersion()).isEqualTo(DEFAULT_VERSION);
        assertThat(testHistoricoCaja.isIndDel()).isEqualTo(DEFAULT_IND_DEL);
        assertThat(testHistoricoCaja.getFecCrea()).isEqualTo(DEFAULT_FEC_CREA);
        assertThat(testHistoricoCaja.getUsuCrea()).isEqualTo(DEFAULT_USU_CREA);
        assertThat(testHistoricoCaja.getIpCrea()).isEqualTo(DEFAULT_IP_CREA);
        assertThat(testHistoricoCaja.getFecModif()).isEqualTo(DEFAULT_FEC_MODIF);
        assertThat(testHistoricoCaja.getUsuModif()).isEqualTo(DEFAULT_USU_MODIF);
        assertThat(testHistoricoCaja.getIpModif()).isEqualTo(DEFAULT_IP_MODIF);
    }

    @Test
    public void createHistoricoCajaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = historicoCajaRepository.findAll().size();

        // Create the HistoricoCaja with an existing ID
        historicoCaja.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restHistoricoCajaMockMvc.perform(post("/api/historico-cajas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(historicoCaja)))
            .andExpect(status().isBadRequest());

        // Validate the HistoricoCaja in the database
        List<HistoricoCaja> historicoCajaList = historicoCajaRepository.findAll();
        assertThat(historicoCajaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    public void checkFecIniVigIsRequired() throws Exception {
        int databaseSizeBeforeTest = historicoCajaRepository.findAll().size();
        // set the field null
        historicoCaja.setFecIniVig(null);

        // Create the HistoricoCaja, which fails.


        restHistoricoCajaMockMvc.perform(post("/api/historico-cajas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(historicoCaja)))
            .andExpect(status().isBadRequest());

        List<HistoricoCaja> historicoCajaList = historicoCajaRepository.findAll();
        assertThat(historicoCajaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkFecFinVigIsRequired() throws Exception {
        int databaseSizeBeforeTest = historicoCajaRepository.findAll().size();
        // set the field null
        historicoCaja.setFecFinVig(null);

        // Create the HistoricoCaja, which fails.


        restHistoricoCajaMockMvc.perform(post("/api/historico-cajas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(historicoCaja)))
            .andExpect(status().isBadRequest());

        List<HistoricoCaja> historicoCajaList = historicoCajaRepository.findAll();
        assertThat(historicoCajaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkEstadoIsRequired() throws Exception {
        int databaseSizeBeforeTest = historicoCajaRepository.findAll().size();
        // set the field null
        historicoCaja.setEstado(null);

        // Create the HistoricoCaja, which fails.


        restHistoricoCajaMockMvc.perform(post("/api/historico-cajas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(historicoCaja)))
            .andExpect(status().isBadRequest());

        List<HistoricoCaja> historicoCajaList = historicoCajaRepository.findAll();
        assertThat(historicoCajaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkVersionIsRequired() throws Exception {
        int databaseSizeBeforeTest = historicoCajaRepository.findAll().size();
        // set the field null
        historicoCaja.setVersion(null);

        // Create the HistoricoCaja, which fails.


        restHistoricoCajaMockMvc.perform(post("/api/historico-cajas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(historicoCaja)))
            .andExpect(status().isBadRequest());

        List<HistoricoCaja> historicoCajaList = historicoCajaRepository.findAll();
        assertThat(historicoCajaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkIndDelIsRequired() throws Exception {
        int databaseSizeBeforeTest = historicoCajaRepository.findAll().size();
        // set the field null
        historicoCaja.setIndDel(null);

        // Create the HistoricoCaja, which fails.


        restHistoricoCajaMockMvc.perform(post("/api/historico-cajas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(historicoCaja)))
            .andExpect(status().isBadRequest());

        List<HistoricoCaja> historicoCajaList = historicoCajaRepository.findAll();
        assertThat(historicoCajaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkFecCreaIsRequired() throws Exception {
        int databaseSizeBeforeTest = historicoCajaRepository.findAll().size();
        // set the field null
        historicoCaja.setFecCrea(null);

        // Create the HistoricoCaja, which fails.


        restHistoricoCajaMockMvc.perform(post("/api/historico-cajas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(historicoCaja)))
            .andExpect(status().isBadRequest());

        List<HistoricoCaja> historicoCajaList = historicoCajaRepository.findAll();
        assertThat(historicoCajaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkUsuCreaIsRequired() throws Exception {
        int databaseSizeBeforeTest = historicoCajaRepository.findAll().size();
        // set the field null
        historicoCaja.setUsuCrea(null);

        // Create the HistoricoCaja, which fails.


        restHistoricoCajaMockMvc.perform(post("/api/historico-cajas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(historicoCaja)))
            .andExpect(status().isBadRequest());

        List<HistoricoCaja> historicoCajaList = historicoCajaRepository.findAll();
        assertThat(historicoCajaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkIpCreaIsRequired() throws Exception {
        int databaseSizeBeforeTest = historicoCajaRepository.findAll().size();
        // set the field null
        historicoCaja.setIpCrea(null);

        // Create the HistoricoCaja, which fails.


        restHistoricoCajaMockMvc.perform(post("/api/historico-cajas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(historicoCaja)))
            .andExpect(status().isBadRequest());

        List<HistoricoCaja> historicoCajaList = historicoCajaRepository.findAll();
        assertThat(historicoCajaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void getAllHistoricoCajas() throws Exception {
        // Initialize the database
        historicoCajaRepository.save(historicoCaja);

        // Get all the historicoCajaList
        restHistoricoCajaMockMvc.perform(get("/api/historico-cajas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(historicoCaja.getId())))
            .andExpect(jsonPath("$.[*].fecIniVig").value(hasItem(sameInstant(DEFAULT_FEC_INI_VIG))))
            .andExpect(jsonPath("$.[*].fecFinVig").value(hasItem(sameInstant(DEFAULT_FEC_FIN_VIG))))
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
    public void getHistoricoCaja() throws Exception {
        // Initialize the database
        historicoCajaRepository.save(historicoCaja);

        // Get the historicoCaja
        restHistoricoCajaMockMvc.perform(get("/api/historico-cajas/{id}", historicoCaja.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(historicoCaja.getId()))
            .andExpect(jsonPath("$.fecIniVig").value(sameInstant(DEFAULT_FEC_INI_VIG)))
            .andExpect(jsonPath("$.fecFinVig").value(sameInstant(DEFAULT_FEC_FIN_VIG)))
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
    public void getNonExistingHistoricoCaja() throws Exception {
        // Get the historicoCaja
        restHistoricoCajaMockMvc.perform(get("/api/historico-cajas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateHistoricoCaja() throws Exception {
        // Initialize the database
        historicoCajaRepository.save(historicoCaja);

        int databaseSizeBeforeUpdate = historicoCajaRepository.findAll().size();

        // Update the historicoCaja
        HistoricoCaja updatedHistoricoCaja = historicoCajaRepository.findById(historicoCaja.getId()).get();
        updatedHistoricoCaja
            .fecIniVig(UPDATED_FEC_INI_VIG)
            .fecFinVig(UPDATED_FEC_FIN_VIG)
            .estado(UPDATED_ESTADO)
            .version(UPDATED_VERSION)
            .indDel(UPDATED_IND_DEL)
            .fecCrea(UPDATED_FEC_CREA)
            .usuCrea(UPDATED_USU_CREA)
            .ipCrea(UPDATED_IP_CREA)
            .fecModif(UPDATED_FEC_MODIF)
            .usuModif(UPDATED_USU_MODIF)
            .ipModif(UPDATED_IP_MODIF);

        restHistoricoCajaMockMvc.perform(put("/api/historico-cajas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedHistoricoCaja)))
            .andExpect(status().isOk());

        // Validate the HistoricoCaja in the database
        List<HistoricoCaja> historicoCajaList = historicoCajaRepository.findAll();
        assertThat(historicoCajaList).hasSize(databaseSizeBeforeUpdate);
        HistoricoCaja testHistoricoCaja = historicoCajaList.get(historicoCajaList.size() - 1);
        assertThat(testHistoricoCaja.getFecIniVig()).isEqualTo(UPDATED_FEC_INI_VIG);
        assertThat(testHistoricoCaja.getFecFinVig()).isEqualTo(UPDATED_FEC_FIN_VIG);
        assertThat(testHistoricoCaja.getEstado()).isEqualTo(UPDATED_ESTADO);
        assertThat(testHistoricoCaja.getVersion()).isEqualTo(UPDATED_VERSION);
        assertThat(testHistoricoCaja.isIndDel()).isEqualTo(UPDATED_IND_DEL);
        assertThat(testHistoricoCaja.getFecCrea()).isEqualTo(UPDATED_FEC_CREA);
        assertThat(testHistoricoCaja.getUsuCrea()).isEqualTo(UPDATED_USU_CREA);
        assertThat(testHistoricoCaja.getIpCrea()).isEqualTo(UPDATED_IP_CREA);
        assertThat(testHistoricoCaja.getFecModif()).isEqualTo(UPDATED_FEC_MODIF);
        assertThat(testHistoricoCaja.getUsuModif()).isEqualTo(UPDATED_USU_MODIF);
        assertThat(testHistoricoCaja.getIpModif()).isEqualTo(UPDATED_IP_MODIF);
    }

    @Test
    public void updateNonExistingHistoricoCaja() throws Exception {
        int databaseSizeBeforeUpdate = historicoCajaRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restHistoricoCajaMockMvc.perform(put("/api/historico-cajas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(historicoCaja)))
            .andExpect(status().isBadRequest());

        // Validate the HistoricoCaja in the database
        List<HistoricoCaja> historicoCajaList = historicoCajaRepository.findAll();
        assertThat(historicoCajaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteHistoricoCaja() throws Exception {
        // Initialize the database
        historicoCajaRepository.save(historicoCaja);

        int databaseSizeBeforeDelete = historicoCajaRepository.findAll().size();

        // Delete the historicoCaja
        restHistoricoCajaMockMvc.perform(delete("/api/historico-cajas/{id}", historicoCaja.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<HistoricoCaja> historicoCajaList = historicoCajaRepository.findAll();
        assertThat(historicoCajaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
