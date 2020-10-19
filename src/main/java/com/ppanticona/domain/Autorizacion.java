package com.ppanticona.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;

/**
 * A Autorizacion.
 */
@Document(collection = "autorizacion")
public class Autorizacion implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("tip_autorizacion")
    private String tipAutorizacion;

    @NotNull
    @Field("token")
    private String token;

    @NotNull
    @Field("fec_ini_vig")
    private ZonedDateTime fecIniVig;

    @NotNull
    @Field("fec_fin_vig")
    private ZonedDateTime fecFinVig;

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

    public String getTipAutorizacion() {
        return tipAutorizacion;
    }

    public Autorizacion tipAutorizacion(String tipAutorizacion) {
        this.tipAutorizacion = tipAutorizacion;
        return this;
    }

    public void setTipAutorizacion(String tipAutorizacion) {
        this.tipAutorizacion = tipAutorizacion;
    }

    public String getToken() {
        return token;
    }

    public Autorizacion token(String token) {
        this.token = token;
        return this;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public ZonedDateTime getFecIniVig() {
        return fecIniVig;
    }

    public Autorizacion fecIniVig(ZonedDateTime fecIniVig) {
        this.fecIniVig = fecIniVig;
        return this;
    }

    public void setFecIniVig(ZonedDateTime fecIniVig) {
        this.fecIniVig = fecIniVig;
    }

    public ZonedDateTime getFecFinVig() {
        return fecFinVig;
    }

    public Autorizacion fecFinVig(ZonedDateTime fecFinVig) {
        this.fecFinVig = fecFinVig;
        return this;
    }

    public void setFecFinVig(ZonedDateTime fecFinVig) {
        this.fecFinVig = fecFinVig;
    }

    public String getEstado() {
        return estado;
    }

    public Autorizacion estado(String estado) {
        this.estado = estado;
        return this;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public Integer getVersion() {
        return version;
    }

    public Autorizacion version(Integer version) {
        this.version = version;
        return this;
    }

    public void setVersion(Integer version) {
        this.version = version;
    }

    public Boolean isIndDel() {
        return indDel;
    }

    public Autorizacion indDel(Boolean indDel) {
        this.indDel = indDel;
        return this;
    }

    public void setIndDel(Boolean indDel) {
        this.indDel = indDel;
    }

    public ZonedDateTime getFecCrea() {
        return fecCrea;
    }

    public Autorizacion fecCrea(ZonedDateTime fecCrea) {
        this.fecCrea = fecCrea;
        return this;
    }

    public void setFecCrea(ZonedDateTime fecCrea) {
        this.fecCrea = fecCrea;
    }

    public String getUsuCrea() {
        return usuCrea;
    }

    public Autorizacion usuCrea(String usuCrea) {
        this.usuCrea = usuCrea;
        return this;
    }

    public void setUsuCrea(String usuCrea) {
        this.usuCrea = usuCrea;
    }

    public String getIpCrea() {
        return ipCrea;
    }

    public Autorizacion ipCrea(String ipCrea) {
        this.ipCrea = ipCrea;
        return this;
    }

    public void setIpCrea(String ipCrea) {
        this.ipCrea = ipCrea;
    }

    public ZonedDateTime getFecModif() {
        return fecModif;
    }

    public Autorizacion fecModif(ZonedDateTime fecModif) {
        this.fecModif = fecModif;
        return this;
    }

    public void setFecModif(ZonedDateTime fecModif) {
        this.fecModif = fecModif;
    }

    public String getUsuModif() {
        return usuModif;
    }

    public Autorizacion usuModif(String usuModif) {
        this.usuModif = usuModif;
        return this;
    }

    public void setUsuModif(String usuModif) {
        this.usuModif = usuModif;
    }

    public String getIpModif() {
        return ipModif;
    }

    public Autorizacion ipModif(String ipModif) {
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
        if (!(o instanceof Autorizacion)) {
            return false;
        }
        return id != null && id.equals(((Autorizacion) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Autorizacion{" +
            "id=" + getId() +
            ", tipAutorizacion='" + getTipAutorizacion() + "'" +
            ", token='" + getToken() + "'" +
            ", fecIniVig='" + getFecIniVig() + "'" +
            ", fecFinVig='" + getFecFinVig() + "'" +
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
