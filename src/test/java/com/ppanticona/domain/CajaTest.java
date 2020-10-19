package com.ppanticona.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.ppanticona.web.rest.TestUtil;

public class CajaTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Caja.class);
        Caja caja1 = new Caja();
        caja1.setId("id1");
        Caja caja2 = new Caja();
        caja2.setId(caja1.getId());
        assertThat(caja1).isEqualTo(caja2);
        caja2.setId("id2");
        assertThat(caja1).isNotEqualTo(caja2);
        caja1.setId(null);
        assertThat(caja1).isNotEqualTo(caja2);
    }
}
