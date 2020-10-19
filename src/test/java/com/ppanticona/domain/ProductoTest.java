package com.ppanticona.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.ppanticona.web.rest.TestUtil;

public class ProductoTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Producto.class);
        Producto producto1 = new Producto();
        producto1.setId("id1");
        Producto producto2 = new Producto();
        producto2.setId(producto1.getId());
        assertThat(producto1).isEqualTo(producto2);
        producto2.setId("id2");
        assertThat(producto1).isNotEqualTo(producto2);
        producto1.setId(null);
        assertThat(producto1).isNotEqualTo(producto2);
    }
}
