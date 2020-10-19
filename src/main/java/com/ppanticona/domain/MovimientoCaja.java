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
 * A MovimientoCaja.
 */
@Document(collection = "movimiento_caja")
public class MovimientoCaja implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("tip_movimiento")
    private String tipMovimiento;

    @Field("monto")
    private Double monto;

    @Field("fec_movimiento")
    private ZonedDateTime fecMovimiento;

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
    @Field("caja")
    @JsonIgnoreProperties(value = "movimientoCajas", allowSetters = true)
    private Caja caja;

    @DBRef
    @Field("autorizacion")
    @JsonIgnoreProperties(value = "movimientoCajas", allowSetters = true)
    private Autorizacion autorizacion;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTipMovimiento() {
        return tipMovimiento;
    }

    public MovimientoCaja tipMovimiento(String tipMovimiento) {
        this.tipMovimiento = tipMovimiento;
        return this;
    }

    public void setTipMovimiento(String tipMovimiento) {
        this.tipMovimiento = tipMovimiento;
    }

    public Double getMonto() {
        return monto;
    }

    public MovimientoCaja monto(Double monto) {
        this.monto = monto;
        return this;
    }

    public void setMonto(Double monto) {
        this.monto = monto;
    }

    public ZonedDateTime getFecMovimiento() {
        return fecMovimiento;
    }

    public MovimientoCaja fecMovimiento(ZonedDateTime fecMovimiento) {
        this.fecMovimiento = fecMovimiento;
        return this;
    }

    public void setFecMovimiento(ZonedDateTime fecMovimiento) {
        this.fecMovimiento = fecMovimiento;
    }

    public Integer getVersion() {
        return version;
    }

    public MovimientoCaja version(Integer version) {
        this.version = version;
        return this;
    }

    public void setVersion(Integer version) {
        this.version = version;
    }

    public Boolean isIndDel() {
        return indDel;
    }

    public MovimientoCaja indDel(Boolean indDel) {
        this.indDel = indDel;
        return this;
    }

    public void setIndDel(Boolean indDel) {
        this.indDel = indDel;
    }

    public ZonedDateTime getFecCrea() {
        return fecCrea;
    }

    public MovimientoCaja fecCrea(ZonedDateTime fecCrea) {
        this.fecCrea = fecCrea;
        return this;
    }

    public void setFecCrea(ZonedDateTime fecCrea) {
        this.fecCrea = fecCrea;
    }

    public String getUsuCrea() {
        return usuCrea;
    }

    public MovimientoCaja usuCrea(String usuCrea) {
        this.usuCrea = usuCrea;
        return this;
    }

    public void setUsuCrea(String usuCrea) {
        this.usuCrea = usuCrea;
    }

    public String getIpCrea() {
        return ipCrea;
    }

    public MovimientoCaja ipCrea(String ipCrea) {
        this.ipCrea = ipCrea;
        return this;
    }

    public void setIpCrea(String ipCrea) {
        this.ipCrea = ipCrea;
    }

    public ZonedDateTime getFecModif() {
        return fecModif;
    }

    public MovimientoCaja fecModif(ZonedDateTime fecModif) {
        this.fecModif = fecModif;
        return this;
    }

    public void setFecModif(ZonedDateTime fecModif) {
        this.fecModif = fecModif;
    }

    public String getUsuModif() {
        return usuModif;
    }

    public MovimientoCaja usuModif(String usuModif) {
        this.usuModif = usuModif;
        return this;
    }

    public void setUsuModif(String usuModif) {
        this.usuModif = usuModif;
    }

    public String getIpModif() {
        return ipModif;
    }

    public MovimientoCaja ipModif(String ipModif) {
        this.ipModif = ipModif;
        return this;
    }

    public void setIpModif(String ipModif) {
        this.ipModif = ipModif;
    }

    public Caja getCaja() {
        return caja;
    }

    public MovimientoCaja caja(Caja caja) {
        this.caja = caja;
        return this;
    }

    public void setCaja(Caja caja) {
        this.caja = caja;
    }

    public Autorizacion getAutorizacion() {
        return autorizacion;
    }

    public MovimientoCaja autorizacion(Autorizacion autorizacion) {
        this.autorizacion = autorizacion;
        return this;
    }

    public void setAutorizacion(Autorizacion autorizacion) {
        this.autorizacion = autorizacion;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof MovimientoCaja)) {
            return false;
        }
        return id != null && id.equals(((MovimientoCaja) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "MovimientoCaja{" +
            "id=" + getId() +
            ", tipMovimiento='" + getTipMovimiento() + "'" +
            ", monto=" + getMonto() +
            ", fecMovimiento='" + getFecMovimiento() + "'" +
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
