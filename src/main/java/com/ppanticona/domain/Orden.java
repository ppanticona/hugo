package com.ppanticona.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.DBRef;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;

/**
 * A Orden.
 */
@Document(collection = "orden")
public class Orden implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("fec_esti_ent")
    private ZonedDateTime fecEstiEnt;

    @Field("fec_recog")
    private ZonedDateTime fecRecog;

    @Field("observacion")
    private String observacion;

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

    @DBRef
    @Field("regVenta")
    private Set<RegVenta> regVentas = new HashSet<>();

    @DBRef
    @Field("cliente")
    @JsonIgnoreProperties(value = "ordens", allowSetters = true)
    private Cliente cliente;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public ZonedDateTime getFecEstiEnt() {
        return fecEstiEnt;
    }

    public Orden fecEstiEnt(ZonedDateTime fecEstiEnt) {
        this.fecEstiEnt = fecEstiEnt;
        return this;
    }

    public void setFecEstiEnt(ZonedDateTime fecEstiEnt) {
        this.fecEstiEnt = fecEstiEnt;
    }

    public ZonedDateTime getFecRecog() {
        return fecRecog;
    }

    public Orden fecRecog(ZonedDateTime fecRecog) {
        this.fecRecog = fecRecog;
        return this;
    }

    public void setFecRecog(ZonedDateTime fecRecog) {
        this.fecRecog = fecRecog;
    }

    public String getObservacion() {
        return observacion;
    }

    public Orden observacion(String observacion) {
        this.observacion = observacion;
        return this;
    }

    public void setObservacion(String observacion) {
        this.observacion = observacion;
    }

    public String getEstado() {
        return estado;
    }

    public Orden estado(String estado) {
        this.estado = estado;
        return this;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public Integer getVersion() {
        return version;
    }

    public Orden version(Integer version) {
        this.version = version;
        return this;
    }

    public void setVersion(Integer version) {
        this.version = version;
    }

    public Boolean isIndDel() {
        return indDel;
    }

    public Orden indDel(Boolean indDel) {
        this.indDel = indDel;
        return this;
    }

    public void setIndDel(Boolean indDel) {
        this.indDel = indDel;
    }

    public ZonedDateTime getFecCrea() {
        return fecCrea;
    }

    public Orden fecCrea(ZonedDateTime fecCrea) {
        this.fecCrea = fecCrea;
        return this;
    }

    public void setFecCrea(ZonedDateTime fecCrea) {
        this.fecCrea = fecCrea;
    }

    public String getUsuCrea() {
        return usuCrea;
    }

    public Orden usuCrea(String usuCrea) {
        this.usuCrea = usuCrea;
        return this;
    }

    public void setUsuCrea(String usuCrea) {
        this.usuCrea = usuCrea;
    }

    public String getIpCrea() {
        return ipCrea;
    }

    public Orden ipCrea(String ipCrea) {
        this.ipCrea = ipCrea;
        return this;
    }

    public void setIpCrea(String ipCrea) {
        this.ipCrea = ipCrea;
    }

    public ZonedDateTime getFecModif() {
        return fecModif;
    }

    public Orden fecModif(ZonedDateTime fecModif) {
        this.fecModif = fecModif;
        return this;
    }

    public void setFecModif(ZonedDateTime fecModif) {
        this.fecModif = fecModif;
    }

    public String getUsuModif() {
        return usuModif;
    }

    public Orden usuModif(String usuModif) {
        this.usuModif = usuModif;
        return this;
    }

    public void setUsuModif(String usuModif) {
        this.usuModif = usuModif;
    }

    public String getIpModif() {
        return ipModif;
    }

    public Orden ipModif(String ipModif) {
        this.ipModif = ipModif;
        return this;
    }

    public void setIpModif(String ipModif) {
        this.ipModif = ipModif;
    }

    public Set<RegVenta> getRegVentas() {
        return regVentas;
    }

    public Orden regVentas(Set<RegVenta> regVentas) {
        this.regVentas = regVentas;
        return this;
    }

    public Orden addRegVenta(RegVenta regVenta) {
        this.regVentas.add(regVenta);
        regVenta.setServidor(this);
        return this;
    }

    public Orden removeRegVenta(RegVenta regVenta) {
        this.regVentas.remove(regVenta);
        regVenta.setServidor(null);
        return this;
    }

    public void setRegVentas(Set<RegVenta> regVentas) {
        this.regVentas = regVentas;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public Orden cliente(Cliente cliente) {
        this.cliente = cliente;
        return this;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Orden)) {
            return false;
        }
        return id != null && id.equals(((Orden) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Orden{" +
            "id=" + getId() +
            ", fecEstiEnt='" + getFecEstiEnt() + "'" +
            ", fecRecog='" + getFecRecog() + "'" +
            ", observacion='" + getObservacion() + "'" +
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
