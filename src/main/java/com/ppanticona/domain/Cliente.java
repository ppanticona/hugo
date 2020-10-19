package com.ppanticona.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;

/**
 * A Cliente.
 */
@Document(collection = "cliente")
public class Cliente implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("tip_doc_cli")
    private String tipDocCli;

    @NotNull
    @Field("nro_doc_cli")
    private String nroDocCli;

    @NotNull
    @Field("nombres_cli")
    private String nombresCli;

    @NotNull
    @Field("apellidos_cli")
    private String apellidosCli;

    @NotNull
    @Field("tel_1")
    private String tel1;

    @Field("tel_2")
    private String tel2;

    @Field("correo")
    private String correo;

    @Field("direccion")
    private String direccion;

    @Field("ref_direccion")
    private String refDireccion;

    @Field("distrito")
    private String distrito;

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

    public String getTipDocCli() {
        return tipDocCli;
    }

    public Cliente tipDocCli(String tipDocCli) {
        this.tipDocCli = tipDocCli;
        return this;
    }

    public void setTipDocCli(String tipDocCli) {
        this.tipDocCli = tipDocCli;
    }

    public String getNroDocCli() {
        return nroDocCli;
    }

    public Cliente nroDocCli(String nroDocCli) {
        this.nroDocCli = nroDocCli;
        return this;
    }

    public void setNroDocCli(String nroDocCli) {
        this.nroDocCli = nroDocCli;
    }

    public String getNombresCli() {
        return nombresCli;
    }

    public Cliente nombresCli(String nombresCli) {
        this.nombresCli = nombresCli;
        return this;
    }

    public void setNombresCli(String nombresCli) {
        this.nombresCli = nombresCli;
    }

    public String getApellidosCli() {
        return apellidosCli;
    }

    public Cliente apellidosCli(String apellidosCli) {
        this.apellidosCli = apellidosCli;
        return this;
    }

    public void setApellidosCli(String apellidosCli) {
        this.apellidosCli = apellidosCli;
    }

    public String getTel1() {
        return tel1;
    }

    public Cliente tel1(String tel1) {
        this.tel1 = tel1;
        return this;
    }

    public void setTel1(String tel1) {
        this.tel1 = tel1;
    }

    public String getTel2() {
        return tel2;
    }

    public Cliente tel2(String tel2) {
        this.tel2 = tel2;
        return this;
    }

    public void setTel2(String tel2) {
        this.tel2 = tel2;
    }

    public String getCorreo() {
        return correo;
    }

    public Cliente correo(String correo) {
        this.correo = correo;
        return this;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getDireccion() {
        return direccion;
    }

    public Cliente direccion(String direccion) {
        this.direccion = direccion;
        return this;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getRefDireccion() {
        return refDireccion;
    }

    public Cliente refDireccion(String refDireccion) {
        this.refDireccion = refDireccion;
        return this;
    }

    public void setRefDireccion(String refDireccion) {
        this.refDireccion = refDireccion;
    }

    public String getDistrito() {
        return distrito;
    }

    public Cliente distrito(String distrito) {
        this.distrito = distrito;
        return this;
    }

    public void setDistrito(String distrito) {
        this.distrito = distrito;
    }

    public String getEstado() {
        return estado;
    }

    public Cliente estado(String estado) {
        this.estado = estado;
        return this;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public Integer getVersion() {
        return version;
    }

    public Cliente version(Integer version) {
        this.version = version;
        return this;
    }

    public void setVersion(Integer version) {
        this.version = version;
    }

    public Boolean isIndDel() {
        return indDel;
    }

    public Cliente indDel(Boolean indDel) {
        this.indDel = indDel;
        return this;
    }

    public void setIndDel(Boolean indDel) {
        this.indDel = indDel;
    }

    public ZonedDateTime getFecCrea() {
        return fecCrea;
    }

    public Cliente fecCrea(ZonedDateTime fecCrea) {
        this.fecCrea = fecCrea;
        return this;
    }

    public void setFecCrea(ZonedDateTime fecCrea) {
        this.fecCrea = fecCrea;
    }

    public String getUsuCrea() {
        return usuCrea;
    }

    public Cliente usuCrea(String usuCrea) {
        this.usuCrea = usuCrea;
        return this;
    }

    public void setUsuCrea(String usuCrea) {
        this.usuCrea = usuCrea;
    }

    public String getIpCrea() {
        return ipCrea;
    }

    public Cliente ipCrea(String ipCrea) {
        this.ipCrea = ipCrea;
        return this;
    }

    public void setIpCrea(String ipCrea) {
        this.ipCrea = ipCrea;
    }

    public ZonedDateTime getFecModif() {
        return fecModif;
    }

    public Cliente fecModif(ZonedDateTime fecModif) {
        this.fecModif = fecModif;
        return this;
    }

    public void setFecModif(ZonedDateTime fecModif) {
        this.fecModif = fecModif;
    }

    public String getUsuModif() {
        return usuModif;
    }

    public Cliente usuModif(String usuModif) {
        this.usuModif = usuModif;
        return this;
    }

    public void setUsuModif(String usuModif) {
        this.usuModif = usuModif;
    }

    public String getIpModif() {
        return ipModif;
    }

    public Cliente ipModif(String ipModif) {
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
        if (!(o instanceof Cliente)) {
            return false;
        }
        return id != null && id.equals(((Cliente) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Cliente{" +
            "id=" + getId() +
            ", tipDocCli='" + getTipDocCli() + "'" +
            ", nroDocCli='" + getNroDocCli() + "'" +
            ", nombresCli='" + getNombresCli() + "'" +
            ", apellidosCli='" + getApellidosCli() + "'" +
            ", tel1='" + getTel1() + "'" +
            ", tel2='" + getTel2() + "'" +
            ", correo='" + getCorreo() + "'" +
            ", direccion='" + getDireccion() + "'" +
            ", refDireccion='" + getRefDireccion() + "'" +
            ", distrito='" + getDistrito() + "'" +
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
