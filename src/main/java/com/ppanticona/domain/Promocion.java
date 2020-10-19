package com.ppanticona.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;

/**
 * A Promocion.
 */
@Document(collection = "promocion")
public class Promocion implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("tip_promocion")
    private String tipPromocion;

    @Field("val_1")
    private String val1;

    @Field("val_2")
    private String val2;

    @Field("val_3")
    private String val3;

    @Field("max_prom")
    private String maxProm;

    @NotNull
    @Field("fec_ini_vig")
    private ZonedDateTime fecIniVig;

    @NotNull
    @Field("fec_fin_vig")
    private ZonedDateTime fecFinVig;

    
    @Field("comentarios")
    private String comentarios;

    @NotNull
    @Field("estado")
    private String estado;

    @NotNull
    @Field("version")
    private Integer version;

    @NotNull
    @Field("ind_del")
    private Boolean indDel;

    @NotNull
    @Field("fec_crea")
    private ZonedDateTime fecCrea;

    @NotNull
    @Field("usu_crea")
    private String usuCrea;

    @NotNull
    @Field("ip_crea")
    private String ipCrea;

    @Field("fec_modif")
    private ZonedDateTime fecModif;

    @Field("usu_modif")
    private String usuModif;

    @Field("ip_modif")
    private String ipModif;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTipPromocion() {
        return tipPromocion;
    }

    public Promocion tipPromocion(String tipPromocion) {
        this.tipPromocion = tipPromocion;
        return this;
    }

    public void setTipPromocion(String tipPromocion) {
        this.tipPromocion = tipPromocion;
    }

    public String getVal1() {
        return val1;
    }

    public Promocion val1(String val1) {
        this.val1 = val1;
        return this;
    }

    public void setVal1(String val1) {
        this.val1 = val1;
    }

    public String getVal2() {
        return val2;
    }

    public Promocion val2(String val2) {
        this.val2 = val2;
        return this;
    }

    public void setVal2(String val2) {
        this.val2 = val2;
    }

    public String getVal3() {
        return val3;
    }

    public Promocion val3(String val3) {
        this.val3 = val3;
        return this;
    }

    public void setVal3(String val3) {
        this.val3 = val3;
    }

    public String getMaxProm() {
        return maxProm;
    }

    public Promocion maxProm(String maxProm) {
        this.maxProm = maxProm;
        return this;
    }

    public void setMaxProm(String maxProm) {
        this.maxProm = maxProm;
    }

    public ZonedDateTime getFecIniVig() {
        return fecIniVig;
    }

    public Promocion fecIniVig(ZonedDateTime fecIniVig) {
        this.fecIniVig = fecIniVig;
        return this;
    }

    public void setFecIniVig(ZonedDateTime fecIniVig) {
        this.fecIniVig = fecIniVig;
    }

    public ZonedDateTime getFecFinVig() {
        return fecFinVig;
    }

    public Promocion fecFinVig(ZonedDateTime fecFinVig) {
        this.fecFinVig = fecFinVig;
        return this;
    }

    public void setFecFinVig(ZonedDateTime fecFinVig) {
        this.fecFinVig = fecFinVig;
    }

    public String getComentarios() {
        return comentarios;
    }

    public Promocion comentarios(String comentarios) {
        this.comentarios = comentarios;
        return this;
    }

    public void setComentarios(String comentarios) {
        this.comentarios = comentarios;
    }

    public String getEstado() {
        return estado;
    }

    public Promocion estado(String estado) {
        this.estado = estado;
        return this;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public Integer getVersion() {
        return version;
    }

    public Promocion version(Integer version) {
        this.version = version;
        return this;
    }

    public void setVersion(Integer version) {
        this.version = version;
    }

    public Boolean isIndDel() {
        return indDel;
    }

    public Promocion indDel(Boolean indDel) {
        this.indDel = indDel;
        return this;
    }

    public void setIndDel(Boolean indDel) {
        this.indDel = indDel;
    }

    public ZonedDateTime getFecCrea() {
        return fecCrea;
    }

    public Promocion fecCrea(ZonedDateTime fecCrea) {
        this.fecCrea = fecCrea;
        return this;
    }

    public void setFecCrea(ZonedDateTime fecCrea) {
        this.fecCrea = fecCrea;
    }

    public String getUsuCrea() {
        return usuCrea;
    }

    public Promocion usuCrea(String usuCrea) {
        this.usuCrea = usuCrea;
        return this;
    }

    public void setUsuCrea(String usuCrea) {
        this.usuCrea = usuCrea;
    }

    public String getIpCrea() {
        return ipCrea;
    }

    public Promocion ipCrea(String ipCrea) {
        this.ipCrea = ipCrea;
        return this;
    }

    public void setIpCrea(String ipCrea) {
        this.ipCrea = ipCrea;
    }

    public ZonedDateTime getFecModif() {
        return fecModif;
    }

    public Promocion fecModif(ZonedDateTime fecModif) {
        this.fecModif = fecModif;
        return this;
    }

    public void setFecModif(ZonedDateTime fecModif) {
        this.fecModif = fecModif;
    }

    public String getUsuModif() {
        return usuModif;
    }

    public Promocion usuModif(String usuModif) {
        this.usuModif = usuModif;
        return this;
    }

    public void setUsuModif(String usuModif) {
        this.usuModif = usuModif;
    }

    public String getIpModif() {
        return ipModif;
    }

    public Promocion ipModif(String ipModif) {
        this.ipModif = ipModif;
        return this;
    }

    public void setIpModif(String ipModif) {
        this.ipModif = ipModif;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Promocion)) {
            return false;
        }
        return id != null && id.equals(((Promocion) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Promocion{" +
            "id=" + getId() +
            ", tipPromocion='" + getTipPromocion() + "'" +
            ", val1='" + getVal1() + "'" +
            ", val2='" + getVal2() + "'" +
            ", val3='" + getVal3() + "'" +
            ", maxProm='" + getMaxProm() + "'" +
            ", fecIniVig='" + getFecIniVig() + "'" +
            ", fecFinVig='" + getFecFinVig() + "'" +
            ", comentarios='" + getComentarios() + "'" +
            ", estado='" + getEstado() + "'" +
            ", version=" + getVersion() +
            ", indDel='" + isIndDel() + "'" +
            ", fecCrea='" + getFecCrea() + "'" +
            ", usuCrea='" + getUsuCrea() + "'" +
            ", ipCrea='" + getIpCrea() + "'" +
            ", fecModif='" + getFecModif() + "'" +
            ", usuModif='" + getUsuModif() + "'" +
            ", ipModif='" + getIpModif() + "'" +
            "}";
    }
}
