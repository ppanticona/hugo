package com.ppanticona.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.DBRef;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;

/**
 * A DetalleOrden.
 */
@Document(collection = "detalle_orden")
public class DetalleOrden implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("cantidad")
    private Double cantidad;

    @NotNull
    @Field("val_uni")
    private Double valUni;

    @NotNull
    @Field("dcto")
    private Double dcto;

    @NotNull
    @Field("subtotal")
    private Double subtotal;

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
    @Field("orden")
    @JsonIgnoreProperties(value = "detalleOrdens", allowSetters = true)
    private Orden orden;

    @DBRef
    @Field("producto")
    @JsonIgnoreProperties(value = "detalleOrdens", allowSetters = true)
    private Producto producto;

    @DBRef
    @Field("promocion")
    @JsonIgnoreProperties(value = "detalleOrdens", allowSetters = true)
    private Promocion promocion;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Double getCantidad() {
        return cantidad;
    }

    public DetalleOrden cantidad(Double cantidad) {
        this.cantidad = cantidad;
        return this;
    }

    public void setCantidad(Double cantidad) {
        this.cantidad = cantidad;
    }

    public Double getValUni() {
        return valUni;
    }

    public DetalleOrden valUni(Double valUni) {
        this.valUni = valUni;
        return this;
    }

    public void setValUni(Double valUni) {
        this.valUni = valUni;
    }

    public Double getDcto() {
        return dcto;
    }

    public DetalleOrden dcto(Double dcto) {
        this.dcto = dcto;
        return this;
    }

    public void setDcto(Double dcto) {
        this.dcto = dcto;
    }

    public Double getSubtotal() {
        return subtotal;
    }

    public DetalleOrden subtotal(Double subtotal) {
        this.subtotal = subtotal;
        return this;
    }

    public void setSubtotal(Double subtotal) {
        this.subtotal = subtotal;
    }

    public String getObservacion() {
        return observacion;
    }

    public DetalleOrden observacion(String observacion) {
        this.observacion = observacion;
        return this;
    }

    public void setObservacion(String observacion) {
        this.observacion = observacion;
    }

    public String getEstado() {
        return estado;
    }

    public DetalleOrden estado(String estado) {
        this.estado = estado;
        return this;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public Integer getVersion() {
        return version;
    }

    public DetalleOrden version(Integer version) {
        this.version = version;
        return this;
    }

    public void setVersion(Integer version) {
        this.version = version;
    }

    public Boolean isIndDel() {
        return indDel;
    }

    public DetalleOrden indDel(Boolean indDel) {
        this.indDel = indDel;
        return this;
    }

    public void setIndDel(Boolean indDel) {
        this.indDel = indDel;
    }

    public ZonedDateTime getFecCrea() {
        return fecCrea;
    }

    public DetalleOrden fecCrea(ZonedDateTime fecCrea) {
        this.fecCrea = fecCrea;
        return this;
    }

    public void setFecCrea(ZonedDateTime fecCrea) {
        this.fecCrea = fecCrea;
    }

    public String getUsuCrea() {
        return usuCrea;
    }

    public DetalleOrden usuCrea(String usuCrea) {
        this.usuCrea = usuCrea;
        return this;
    }

    public void setUsuCrea(String usuCrea) {
        this.usuCrea = usuCrea;
    }

    public String getIpCrea() {
        return ipCrea;
    }

    public DetalleOrden ipCrea(String ipCrea) {
        this.ipCrea = ipCrea;
        return this;
    }

    public void setIpCrea(String ipCrea) {
        this.ipCrea = ipCrea;
    }

    public ZonedDateTime getFecModif() {
        return fecModif;
    }

    public DetalleOrden fecModif(ZonedDateTime fecModif) {
        this.fecModif = fecModif;
        return this;
    }

    public void setFecModif(ZonedDateTime fecModif) {
        this.fecModif = fecModif;
    }

    public String getUsuModif() {
        return usuModif;
    }

    public DetalleOrden usuModif(String usuModif) {
        this.usuModif = usuModif;
        return this;
    }

    public void setUsuModif(String usuModif) {
        this.usuModif = usuModif;
    }

    public String getIpModif() {
        return ipModif;
    }

    public DetalleOrden ipModif(String ipModif) {
        this.ipModif = ipModif;
        return this;
    }

    public void setIpModif(String ipModif) {
        this.ipModif = ipModif;
    }

    public Orden getOrden() {
        return orden;
    }

    public DetalleOrden orden(Orden orden) {
        this.orden = orden;
        return this;
    }

    public void setOrden(Orden orden) {
        this.orden = orden;
    }

    public Producto getProducto() {
        return producto;
    }

    public DetalleOrden producto(Producto producto) {
        this.producto = producto;
        return this;
    }

    public void setProducto(Producto producto) {
        this.producto = producto;
    }

    public Promocion getPromocion() {
        return promocion;
    }

    public DetalleOrden promocion(Promocion promocion) {
        this.promocion = promocion;
        return this;
    }

    public void setPromocion(Promocion promocion) {
        this.promocion = promocion;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof DetalleOrden)) {
            return false;
        }
        return id != null && id.equals(((DetalleOrden) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "DetalleOrden{" +
            "id=" + getId() +
            ", cantidad=" + getCantidad() +
            ", valUni=" + getValUni() +
            ", dcto=" + getDcto() +
            ", subtotal=" + getSubtotal() +
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
