package com.ppanticona.web.rest;

import com.ppanticona.HugoApp;
import com.ppanticona.domain.Producto;
import com.ppanticona.repository.ProductoRepository;

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
 * Integration tests for the {@link ProductoResource} REST controller.
 */
@SpringBootTest(classes = HugoApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ProductoResourceIT {

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    private static final Double DEFAULT_VALOR = 1D;
    private static final Double UPDATED_VALOR = 2D;

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
    private ProductoRepository productoRepository;

    @Autowired
    private MockMvc restProductoMockMvc;

    private Producto producto;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Producto createEntity() {
        Producto producto = new Producto()
            .descripcion(DEFAULT_DESCRIPCION)
            .valor(DEFAULT_VALOR)
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
        return producto;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Producto createUpdatedEntity() {
        Producto producto = new Producto()
            .descripcion(UPDATED_DESCRIPCION)
            .valor(UPDATED_VALOR)
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
        return producto;
    }

    @BeforeEach
    public void initTest() {
        productoRepository.deleteAll();
        producto = createEntity();
    }

    @Test
    public void createProducto() throws Exception {
        int databaseSizeBeforeCreate = productoRepository.findAll().size();
        // Create the Producto
        restProductoMockMvc.perform(post("/api/productos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(producto)))
            .andExpect(status().isCreated());

        // Validate the Producto in the database
        List<Producto> productoList = productoRepository.findAll();
        assertThat(productoList).hasSize(databaseSizeBeforeCreate + 1);
        Producto testProducto = productoList.get(productoList.size() - 1);
        assertThat(testProducto.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
        assertThat(testProducto.getValor()).isEqualTo(DEFAULT_VALOR);
        assertThat(testProducto.getFecIniVig()).isEqualTo(DEFAULT_FEC_INI_VIG);
        assertThat(testProducto.getFecFinVig()).isEqualTo(DEFAULT_FEC_FIN_VIG);
        assertThat(testProducto.getEstado()).isEqualTo(DEFAULT_ESTADO);
        assertThat(testProducto.getVersion()).isEqualTo(DEFAULT_VERSION);
        assertThat(testProducto.isIndDel()).isEqualTo(DEFAULT_IND_DEL);
        assertThat(testProducto.getFecCrea()).isEqualTo(DEFAULT_FEC_CREA);
        assertThat(testProducto.getUsuCrea()).isEqualTo(DEFAULT_USU_CREA);
        assertThat(testProducto.getIpCrea()).isEqualTo(DEFAULT_IP_CREA);
        assertThat(testProducto.getFecModif()).isEqualTo(DEFAULT_FEC_MODIF);
        assertThat(testProducto.getUsuModif()).isEqualTo(DEFAULT_USU_MODIF);
        assertThat(testProducto.getIpModif()).isEqualTo(DEFAULT_IP_MODIF);
    }

    @Test
    public void createProductoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = productoRepository.findAll().size();

        // Create the Producto with an existing ID
        producto.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restProductoMockMvc.perform(post("/api/productos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(producto)))
            .andExpect(status().isBadRequest());

        // Validate the Producto in the database
        List<Producto> productoList = productoRepository.findAll();
        assertThat(productoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    public void checkDescripcionIsRequired() throws Exception {
        int databaseSizeBeforeTest = productoRepository.findAll().size();
        // set the field null
        producto.setDescripcion(null);

        // Create the Producto, which fails.


        restProductoMockMvc.perform(post("/api/productos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(producto)))
            .andExpect(status().isBadRequest());

        List<Producto> productoList = productoRepository.findAll();
        assertThat(productoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkValorIsRequired() throws Exception {
        int databaseSizeBeforeTest = productoRepository.findAll().size();
        // set the field null
        producto.setValor(null);

        // Create the Producto, which fails.


        restProductoMockMvc.perform(post("/api/productos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(producto)))
            .andExpect(status().isBadRequest());

        List<Producto> productoList = productoRepository.findAll();
        assertThat(productoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkFecIniVigIsRequired() throws Exception {
        int databaseSizeBeforeTest = productoRepository.findAll().size();
        // set the field null
        producto.setFecIniVig(null);

        // Create the Producto, which fails.


        restProductoMockMvc.perform(post("/api/productos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(producto)))
            .andExpect(status().isBadRequest());

        List<Producto> productoList = productoRepository.findAll();
        assertThat(productoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkFecFinVigIsRequired() throws Exception {
        int databaseSizeBeforeTest = productoRepository.findAll().size();
        // set the field null
        producto.setFecFinVig(null);

        // Create the Producto, which fails.


        restProductoMockMvc.perform(post("/api/productos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(producto)))
            .andExpect(status().isBadRequest());

        List<Producto> productoList = productoRepository.findAll();
        assertThat(productoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkEstadoIsRequired() throws Exception {
        int databaseSizeBeforeTest = productoRepository.findAll().size();
        // set the field null
        producto.setEstado(null);

        // Create the Producto, which fails.


        restProductoMockMvc.perform(post("/api/productos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(producto)))
            .andExpect(status().isBadRequest());

        List<Producto> productoList = productoRepository.findAll();
        assertThat(productoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkVersionIsRequired() throws Exception {
        int databaseSizeBeforeTest = productoRepository.findAll().size();
        // set the field null
        producto.setVersion(null);

        // Create the Producto, which fails.


        restProductoMockMvc.perform(post("/api/productos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(producto)))
            .andExpect(status().isBadRequest());

        List<Producto> productoList = productoRepository.findAll();
        assertThat(productoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkIndDelIsRequired() throws Exception {
        int databaseSizeBeforeTest = productoRepository.findAll().size();
        // set the field null
        producto.setIndDel(null);

        // Create the Producto, which fails.


        restProductoMockMvc.perform(post("/api/productos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(producto)))
            .andExpect(status().isBadRequest());

        List<Producto> productoList = productoRepository.findAll();
        assertThat(productoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkFecCreaIsRequired() throws Exception {
        int databaseSizeBeforeTest = productoRepository.findAll().size();
        // set the field null
        producto.setFecCrea(null);

        // Create the Producto, which fails.


        restProductoMockMvc.perform(post("/api/productos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(producto)))
            .andExpect(status().isBadRequest());

        List<Producto> productoList = productoRepository.findAll();
        assertThat(productoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkUsuCreaIsRequired() throws Exception {
        int databaseSizeBeforeTest = productoRepository.findAll().size();
        // set the field null
        producto.setUsuCrea(null);

        // Create the Producto, which fails.


        restProductoMockMvc.perform(post("/api/productos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(producto)))
            .andExpect(status().isBadRequest());

        List<Producto> productoList = productoRepository.findAll();
        assertThat(productoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkIpCreaIsRequired() throws Exception {
        int databaseSizeBeforeTest = productoRepository.findAll().size();
        // set the field null
        producto.setIpCrea(null);

        // Create the Producto, which fails.


        restProductoMockMvc.perform(post("/api/productos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(producto)))
            .andExpect(status().isBadRequest());

        List<Producto> productoList = productoRepository.findAll();
        assertThat(productoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void getAllProductos() throws Exception {
        // Initialize the database
        productoRepository.save(producto);

        // Get all the productoList
        restProductoMockMvc.perform(get("/api/productos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(producto.getId())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION)))
            .andExpect(jsonPath("$.[*].valor").value(hasItem(DEFAULT_VALOR.doubleValue())))
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
    public void getProducto() throws Exception {
        // Initialize the database
        productoRepository.save(producto);

        // Get the producto
        restProductoMockMvc.perform(get("/api/productos/{id}", producto.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(producto.getId()))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION))
            .andExpect(jsonPath("$.valor").value(DEFAULT_VALOR.doubleValue()))
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
    public void getNonExistingProducto() throws Exception {
        // Get the producto
        restProductoMockMvc.perform(get("/api/productos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateProducto() throws Exception {
        // Initialize the database
        productoRepository.save(producto);

        int databaseSizeBeforeUpdate = productoRepository.findAll().size();

        // Update the producto
        Producto updatedProducto = productoRepository.findById(producto.getId()).get();
        updatedProducto
            .descripcion(UPDATED_DESCRIPCION)
            .valor(UPDATED_VALOR)
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

        restProductoMockMvc.perform(put("/api/productos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedProducto)))
            .andExpect(status().isOk());

        // Validate the Producto in the database
        List<Producto> productoList = productoRepository.findAll();
        assertThat(productoList).hasSize(databaseSizeBeforeUpdate);
        Producto testProducto = productoList.get(productoList.size() - 1);
        assertThat(testProducto.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testProducto.getValor()).isEqualTo(UPDATED_VALOR);
        assertThat(testProducto.getFecIniVig()).isEqualTo(UPDATED_FEC_INI_VIG);
        assertThat(testProducto.getFecFinVig()).isEqualTo(UPDATED_FEC_FIN_VIG);
        assertThat(testProducto.getEstado()).isEqualTo(UPDATED_ESTADO);
        assertThat(testProducto.getVersion()).isEqualTo(UPDATED_VERSION);
        assertThat(testProducto.isIndDel()).isEqualTo(UPDATED_IND_DEL);
        assertThat(testProducto.getFecCrea()).isEqualTo(UPDATED_FEC_CREA);
        assertThat(testProducto.getUsuCrea()).isEqualTo(UPDATED_USU_CREA);
        assertThat(testProducto.getIpCrea()).isEqualTo(UPDATED_IP_CREA);
        assertThat(testProducto.getFecModif()).isEqualTo(UPDATED_FEC_MODIF);
        assertThat(testProducto.getUsuModif()).isEqualTo(UPDATED_USU_MODIF);
        assertThat(testProducto.getIpModif()).isEqualTo(UPDATED_IP_MODIF);
    }

    @Test
    public void updateNonExistingProducto() throws Exception {
        int databaseSizeBeforeUpdate = productoRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProductoMockMvc.perform(put("/api/productos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(producto)))
            .andExpect(status().isBadRequest());

        // Validate the Producto in the database
        List<Producto> productoList = productoRepository.findAll();
        assertThat(productoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteProducto() throws Exception {
        // Initialize the database
        productoRepository.save(producto);

        int databaseSizeBeforeDelete = productoRepository.findAll().size();

        // Delete the producto
        restProductoMockMvc.perform(delete("/api/productos/{id}", producto.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Producto> productoList = productoRepository.findAll();
        assertThat(productoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
