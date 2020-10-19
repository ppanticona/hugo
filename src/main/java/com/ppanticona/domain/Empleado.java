package com.ppanticona.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;

/**
 * A Empleado.
 */
@Document(collection = "empleado")
public class Empleado implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("tip_doc_emp")
    private String tipDocEmp;

    @NotNull
    @Field("nro_doc_emp")
    private String nroDocEmp;

    @NotNull
    @Field("nombres_emp")
    private String nombresEmp;

    @NotNull
    @Field("apellidos_emp")
    private String apellidosEmp;

    @Field("categoria")
    private String categoria;

    @Field("tel_1")
    private String tel1;

    @Field("tel_2")
    private String tel2;

    @Field("correo")
    private String correo;

    @Field("direccion")
    private String direccion;

    @Field("ref_direcc")
    private String refDirecc;

    @Field("distrito")
    private String distrito;

    @Field("fec_ingreso")
    private ZonedDateTime fecIngreso;

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

    public String getTipDocEmp() {
        return tipDocEmp;
    }

    public Empleado tipDocEmp(String tipDocEmp) {
        this.tipDocEmp = tipDocEmp;
        return this;
    }

    public void setTipDocEmp(String tipDocEmp) {
        this.tipDocEmp = tipDocEmp;
    }

    public String getNroDocEmp() {
        return nroDocEmp;
    }

    public Empleado nroDocEmp(String nroDocEmp) {
        this.nroDocEmp = nroDocEmp;
        return this;
    }

    public void setNroDocEmp(String nroDocEmp) {
        this.nroDocEmp = nroDocEmp;
    }

    public String getNombresEmp() {
        return nombresEmp;
    }

    public Empleado nombresEmp(String nombresEmp) {
        this.nombresEmp = nombresEmp;
        return this;
    }

    public void setNombresEmp(String nombresEmp) {
        this.nombresEmp = nombresEmp;
    }

    public String getApellidosEmp() {
        return apellidosEmp;
    }

    public Empleado apellidosEmp(String apellidosEmp) {
        this.apellidosEmp = apellidosEmp;
        return this;
    }

    public void setApellidosEmp(String apellidosEmp) {
        this.apellidosEmp = apellidosEmp;
    }

    public String getCategoria() {
        return categoria;
    }

    public Empleado categoria(String categoria) {
        this.categoria = categoria;
        return this;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public String getTel1() {
        return tel1;
    }

    public Empleado tel1(String tel1) {
        this.tel1 = tel1;
        return this;
    }

    public void setTel1(String tel1) {
        this.tel1 = tel1;
    }

    public String getTel2() {
        return tel2;
    }

    public Empleado tel2(String tel2) {
        this.tel2 = tel2;
        return this;
    }

    public void setTel2(String tel2) {
        this.tel2 = tel2;
    }

    public String getCorreo() {
        return correo;
    }

    public Empleado correo(String correo) {
        this.correo = correo;
        return this;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getDireccion() {
        return direccion;
    }

    public Empleado direccion(String direccion) {
        this.direccion = direccion;
        return this;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getRefDirecc() {
        return refDirecc;
    }

    public Empleado refDirecc(String refDirecc) {
        this.refDirecc = refDirecc;
        return this;
    }

    public void setRefDirecc(String refDirecc) {
        this.refDirecc = refDirecc;
    }

    public String getDistrito() {
        return distrito;
    }

    public Empleado distrito(String distrito) {
        this.distrito = distrito;
        return this;
    }

    public void setDistrito(String distrito) {
        this.distrito = distrito;
    }

    public ZonedDateTime getFecIngreso() {
        return fecIngreso;
    }

    public Empleado fecIngreso(ZonedDateTime fecIngreso) {
        this.fecIngreso = fecIngreso;
        return this;
    }

    public void setFecIngreso(ZonedDateTime fecIngreso) {
        this.fecIngreso = fecIngreso;
    }

    public String getEstado() {
        return estado;
    }

    public Empleado estado(String estado) {
        this.estado = estado;
        return this;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public Integer getVersion() {
        return version;
    }

    public Empleado version(Integer version) {
        this.version = version;
        return this;
    }

    public void setVersion(Integer version) {
        this.version = version;
    }

    public Boolean isIndDel() {
        return indDel;
    }

    public Empleado indDel(Boolean indDel) {
        this.indDel = indDel;
        return this;
    }

    public void setIndDel(Boolean indDel) {
        this.indDel = indDel;
    }

    public ZonedDateTime getFecCrea() {
        return fecCrea;
    }

    public Empleado fecCrea(ZonedDateTime fecCrea) {
        this.fecCrea = fecCrea;
        return this;
    }

    public void setFecCrea(ZonedDateTime fecCrea) {
        this.fecCrea = fecCrea;
    }

    public String getUsuCrea() {
        return usuCrea;
    }

    public Empleado usuCrea(String usuCrea) {
        this.usuCrea = usuCrea;
        return this;
    }

    public void setUsuCrea(String usuCrea) {
        this.usuCrea = usuCrea;
    }

    public String getIpCrea() {
        return ipCrea;
    }

    public Empleado ipCrea(String ipCrea) {
        this.ipCrea = ipCrea;
        return this;
    }

    public void setIpCrea(String ipCrea) {
        this.ipCrea = ipCrea;
    }

    public ZonedDateTime getFecModif() {
        return fecModif;
    }

    public Empleado fecModif(ZonedDateTime fecModif) {
        this.fecModif = fecModif;
        return this;
    }

    public void setFecModif(ZonedDateTime fecModif) {
        this.fecModif = fecModif;
    }

    public String getUsuModif() {
        return usuModif;
    }

    public Empleado usuModif(String usuModif) {
        this.usuModif = usuModif;
        return this;
    }

    public void setUsuModif(String usuModif) {
        this.usuModif = usuModif;
    }

    public String getIpModif() {
        return ipModif;
    }

    public Empleado ipModif(String ipModif) {
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
        if (!(o instanceof Empleado)) {
            return false;
        }
        return id != null && id.equals(((Empleado) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Empleado{" +
            "id=" + getId() +
            ", tipDocEmp='" + getTipDocEmp() + "'" +
            ", nroDocEmp='" + getNroDocEmp() + "'" +
            ", nombresEmp='" + getNombresEmp() + "'" +
            ", apellidosEmp='" + getApellidosEmp() + "'" +
            ", categoria='" + getCategoria() + "'" +
            ", tel1='" + getTel1() + "'" +
            ", tel2='" + getTel2() + "'" +
            ", correo='" + getCorreo() + "'" +
            ", direccion='" + getDireccion() + "'" +
            ", refDirecc='" + getRefDirecc() + "'" +
            ", distrito='" + getDistrito() + "'" +
            ", fecIngreso='" + getFecIngreso() + "'" +
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
