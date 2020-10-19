package com.ppanticona.web.rest;

import com.ppanticona.HugoApp;
import com.ppanticona.domain.Autorizacion;
import com.ppanticona.repository.AutorizacionRepository;

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
 * Integration tests for the {@link AutorizacionResource} REST controller.
 */
@SpringBootTest(classes = HugoApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class AutorizacionResourceIT {

    private static final String DEFAULT_TIP_AUTORIZACION = "AAAAAAAAAA";
    private static final String UPDATED_TIP_AUTORIZACION = "BBBBBBBBBB";

    private static final String DEFAULT_TOKEN = "AAAAAAAAAA";
    private static final String UPDATED_TOKEN = "BBBBBBBBBB";

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
    private AutorizacionRepository autorizacionRepository;

    @Autowired
    private MockMvc restAutorizacionMockMvc;

    private Autorizacion autorizacion;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Autorizacion createEntity() {
        Autorizacion autorizacion = new Autorizacion()
            .tipAutorizacion(DEFAULT_TIP_AUTORIZACION)
            .token(DEFAULT_TOKEN)
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
        return autorizacion;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Autorizacion createUpdatedEntity() {
        Autorizacion autorizacion = new Autorizacion()
            .tipAutorizacion(UPDATED_TIP_AUTORIZACION)
            .token(UPDATED_TOKEN)
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
        return autorizacion;
    }

    @BeforeEach
    public void initTest() {
        autorizacionRepository.deleteAll();
        autorizacion = createEntity();
    }

    @Test
    public void createAutorizacion() throws Exception {
        int databaseSizeBeforeCreate = autorizacionRepository.findAll().size();
        // Create the Autorizacion
        restAutorizacionMockMvc.perform(post("/api/autorizacions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(autorizacion)))
            .andExpect(status().isCreated());

        // Validate the Autorizacion in the database
        List<Autorizacion> autorizacionList = autorizacionRepository.findAll();
        assertThat(autorizacionList).hasSize(databaseSizeBeforeCreate + 1);
        Autorizacion testAutorizacion = autorizacionList.get(autorizacionList.size() - 1);
        assertThat(testAutorizacion.getTipAutorizacion()).isEqualTo(DEFAULT_TIP_AUTORIZACION);
        assertThat(testAutorizacion.getToken()).isEqualTo(DEFAULT_TOKEN);
        assertThat(testAutorizacion.getFecIniVig()).isEqualTo(DEFAULT_FEC_INI_VIG);
        assertThat(testAutorizacion.getFecFinVig()).isEqualTo(DEFAULT_FEC_FIN_VIG);
        assertThat(testAutorizacion.getEstado()).isEqualTo(DEFAULT_ESTADO);
        assertThat(testAutorizacion.getVersion()).isEqualTo(DEFAULT_VERSION);
        assertThat(testAutorizacion.isIndDel()).isEqualTo(DEFAULT_IND_DEL);
        assertThat(testAutorizacion.getFecCrea()).isEqualTo(DEFAULT_FEC_CREA);
        assertThat(testAutorizacion.getUsuCrea()).isEqualTo(DEFAULT_USU_CREA);
        assertThat(testAutorizacion.getIpCrea()).isEqualTo(DEFAULT_IP_CREA);
        assertThat(testAutorizacion.getFecModif()).isEqualTo(DEFAULT_FEC_MODIF);
        assertThat(testAutorizacion.getUsuModif()).isEqualTo(DEFAULT_USU_MODIF);
        assertThat(testAutorizacion.getIpModif()).isEqualTo(DEFAULT_IP_MODIF);
    }

    @Test
    public void createAutorizacionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = autorizacionRepository.findAll().size();

        // Create the Autorizacion with an existing ID
        autorizacion.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restAutorizacionMockMvc.perform(post("/api/autorizacions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(autorizacion)))
            .andExpect(status().isBadRequest());

        // Validate the Autorizacion in the database
        List<Autorizacion> autorizacionList = autorizacionRepository.findAll();
        assertThat(autorizacionList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    public void checkTipAutorizacionIsRequired() throws Exception {
        int databaseSizeBeforeTest = autorizacionRepository.findAll().size();
        // set the field null
        autorizacion.setTipAutorizacion(null);

        // Create the Autorizacion, which fails.


        restAutorizacionMockMvc.perform(post("/api/autorizacions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(autorizacion)))
            .andExpect(status().isBadRequest());

        List<Autorizacion> autorizacionList = autorizacionRepository.findAll();
        assertThat(autorizacionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkTokenIsRequired() throws Exception {
        int databaseSizeBeforeTest = autorizacionRepository.findAll().size();
        // set the field null
        autorizacion.setToken(null);

        // Create the Autorizacion, which fails.


        restAutorizacionMockMvc.perform(post("/api/autorizacions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(autorizacion)))
            .andExpect(status().isBadRequest());

        List<Autorizacion> autorizacionList = autorizacionRepository.findAll();
        assertThat(autorizacionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkFecIniVigIsRequired() throws Exception {
        int databaseSizeBeforeTest = autorizacionRepository.findAll().size();
        // set the field null
        autorizacion.setFecIniVig(null);

        // Create the Autorizacion, which fails.


        restAutorizacionMockMvc.perform(post("/api/autorizacions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(autorizacion)))
            .andExpect(status().isBadRequest());

        List<Autorizacion> autorizacionList = autorizacionRepository.findAll();
        assertThat(autorizacionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkFecFinVigIsRequired() throws Exception {
        int databaseSizeBeforeTest = autorizacionRepository.findAll().size();
        // set the field null
        autorizacion.setFecFinVig(null);

        // Create the Autorizacion, which fails.


        restAutorizacionMockMvc.perform(post("/api/autorizacions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(autorizacion)))
            .andExpect(status().isBadRequest());

        List<Autorizacion> autorizacionList = autorizacionRepository.findAll();
        assertThat(autorizacionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkEstadoIsRequired() throws Exception {
        int databaseSizeBeforeTest = autorizacionRepository.findAll().size();
        // set the field null
        autorizacion.setEstado(null);

        // Create the Autorizacion, which fails.


        restAutorizacionMockMvc.perform(post("/api/autorizacions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(autorizacion)))
            .andExpect(status().isBadRequest());

        List<Autorizacion> autorizacionList = autorizacionRepository.findAll();
        assertThat(autorizacionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkVersionIsRequired() throws Exception {
        int databaseSizeBeforeTest = autorizacionRepository.findAll().size();
        // set the field null
        autorizacion.setVersion(null);

        // Create the Autorizacion, which fails.


        restAutorizacionMockMvc.perform(post("/api/autorizacions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(autorizacion)))
            .andExpect(status().isBadRequest());

        List<Autorizacion> autorizacionList = autorizacionRepository.findAll();
        assertThat(autorizacionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkIndDelIsRequired() throws Exception {
        int databaseSizeBeforeTest = autorizacionRepository.findAll().size();
        // set the field null
        autorizacion.setIndDel(null);

        // Create the Autorizacion, which fails.


        restAutorizacionMockMvc.perform(post("/api/autorizacions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(autorizacion)))
            .andExpect(status().isBadRequest());

        List<Autorizacion> autorizacionList = autorizacionRepository.findAll();
        assertThat(autorizacionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkFecCreaIsRequired() throws Exception {
        int databaseSizeBeforeTest = autorizacionRepository.findAll().size();
        // set the field null
        autorizacion.setFecCrea(null);

        // Create the Autorizacion, which fails.


        restAutorizacionMockMvc.perform(post("/api/autorizacions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(autorizacion)))
            .andExpect(status().isBadRequest());

        List<Autorizacion> autorizacionList = autorizacionRepository.findAll();
        assertThat(autorizacionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkUsuCreaIsRequired() throws Exception {
        int databaseSizeBeforeTest = autorizacionRepository.findAll().size();
        // set the field null
        autorizacion.setUsuCrea(null);

        // Create the Autorizacion, which fails.


        restAutorizacionMockMvc.perform(post("/api/autorizacions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(autorizacion)))
            .andExpect(status().isBadRequest());

        List<Autorizacion> autorizacionList = autorizacionRepository.findAll();
        assertThat(autorizacionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkIpCreaIsRequired() throws Exception {
        int databaseSizeBeforeTest = autorizacionRepository.findAll().size();
        // set the field null
        autorizacion.setIpCrea(null);

        // Create the Autorizacion, which fails.


        restAutorizacionMockMvc.perform(post("/api/autorizacions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(autorizacion)))
            .andExpect(status().isBadRequest());

        List<Autorizacion> autorizacionList = autorizacionRepository.findAll();
        assertThat(autorizacionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void getAllAutorizacions() throws Exception {
        // Initialize the database
        autorizacionRepository.save(autorizacion);

        // Get all the autorizacionList
        restAutorizacionMockMvc.perform(get("/api/autorizacions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(autorizacion.getId())))
            .andExpect(jsonPath("$.[*].tipAutorizacion").value(hasItem(DEFAULT_TIP_AUTORIZACION)))
            .andExpect(jsonPath("$.[*].token").value(hasItem(DEFAULT_TOKEN)))
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
    public void getAutorizacion() throws Exception {
        // Initialize the database
        autorizacionRepository.save(autorizacion);

        // Get the autorizacion
        restAutorizacionMockMvc.perform(get("/api/autorizacions/{id}", autorizacion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(autorizacion.getId()))
            .andExpect(jsonPath("$.tipAutorizacion").value(DEFAULT_TIP_AUTORIZACION))
            .andExpect(jsonPath("$.token").value(DEFAULT_TOKEN))
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
    public void getNonExistingAutorizacion() throws Exception {
        // Get the autorizacion
        restAutorizacionMockMvc.perform(get("/api/autorizacions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateAutorizacion() throws Exception {
        // Initialize the database
        autorizacionRepository.save(autorizacion);

        int databaseSizeBeforeUpdate = autorizacionRepository.findAll().size();

        // Update the autorizacion
        Autorizacion updatedAutorizacion = autorizacionRepository.findById(autorizacion.getId()).get();
        updatedAutorizacion
            .tipAutorizacion(UPDATED_TIP_AUTORIZACION)
            .token(UPDATED_TOKEN)
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

        restAutorizacionMockMvc.perform(put("/api/autorizacions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedAutorizacion)))
            .andExpect(status().isOk());

        // Validate the Autorizacion in the database
        List<Autorizacion> autorizacionList = autorizacionRepository.findAll();
        assertThat(autorizacionList).hasSize(databaseSizeBeforeUpdate);
        Autorizacion testAutorizacion = autorizacionList.get(autorizacionList.size() - 1);
        assertThat(testAutorizacion.getTipAutorizacion()).isEqualTo(UPDATED_TIP_AUTORIZACION);
        assertThat(testAutorizacion.getToken()).isEqualTo(UPDATED_TOKEN);
        assertThat(testAutorizacion.getFecIniVig()).isEqualTo(UPDATED_FEC_INI_VIG);
        assertThat(testAutorizacion.getFecFinVig()).isEqualTo(UPDATED_FEC_FIN_VIG);
        assertThat(testAutorizacion.getEstado()).isEqualTo(UPDATED_ESTADO);
        assertThat(testAutorizacion.getVersion()).isEqualTo(UPDATED_VERSION);
        assertThat(testAutorizacion.isIndDel()).isEqualTo(UPDATED_IND_DEL);
        assertThat(testAutorizacion.getFecCrea()).isEqualTo(UPDATED_FEC_CREA);
        assertThat(testAutorizacion.getUsuCrea()).isEqualTo(UPDATED_USU_CREA);
        assertThat(testAutorizacion.getIpCrea()).isEqualTo(UPDATED_IP_CREA);
        assertThat(testAutorizacion.getFecModif()).isEqualTo(UPDATED_FEC_MODIF);
        assertThat(testAutorizacion.getUsuModif()).isEqualTo(UPDATED_USU_MODIF);
        assertThat(testAutorizacion.getIpModif()).isEqualTo(UPDATED_IP_MODIF);
    }

    @Test
    public void updateNonExistingAutorizacion() throws Exception {
        int databaseSizeBeforeUpdate = autorizacionRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAutorizacionMockMvc.perform(put("/api/autorizacions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(autorizacion)))
            .andExpect(status().isBadRequest());

        // Validate the Autorizacion in the database
        List<Autorizacion> autorizacionList = autorizacionRepository.findAll();
        assertThat(autorizacionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteAutorizacion() throws Exception {
        // Initialize the database
        autorizacionRepository.save(autorizacion);

        int databaseSizeBeforeDelete = autorizacionRepository.findAll().size();

        // Delete the autorizacion
        restAutorizacionMockMvc.perform(delete("/api/autorizacions/{id}", autorizacion.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Autorizacion> autorizacionList = autorizacionRepository.findAll();
        assertThat(autorizacionList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
