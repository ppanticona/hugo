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
 * A RegVenta.
 */
@Document(collection = "reg_venta")
public class RegVenta implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("periodo")
    private String periodo;

    @NotNull
    @Field("mes")
    private String mes;

    @Field("asient_contab")
    private String asientContab;

    @NotNull
    @Field("fec_emi_comp")
    private ZonedDateTime fecEmiComp;

    @NotNull
    @Field("fec_venc_comp")
    private ZonedDateTime fecVencComp;

    @NotNull
    @Field("tip_comp")
    private String tipComp;

    @NotNull
    @Field("nro_serie_comp")
    private String nroSerieComp;

    @NotNull
    @Field("nro_comp")
    private String nroComp;

    @Field("conso_dia")
    private String consoDia;

    @NotNull
    @Field("tip_doc_cli")
    private String tipDocCli;

    @NotNull
    @Field("nro_doc_cli")
    private String nroDocCli;

    @NotNull
    @Field("ape_raz_soc_cli")
    private String apeRazSocCli;

    @Field("val_fac_expor")
    private Double valFacExpor;

    @NotNull
    @Field("base_imp_oper_grav")
    private Double baseImpOperGrav;

    @NotNull
    @Field("dscto_base_imp")
    private Double dsctoBaseImp;

    @NotNull
    @Field("igv_ipm")
    private Float igvIpm;

    @NotNull
    @Field("dscto_igv_ipm")
    private Float dsctoIgvIpm;

    @NotNull
    @Field("imp_ope_exo")
    private Float impOpeExo;

    @NotNull
    @Field("imp_tot_ope_inafec")
    private Float impTotOpeInafec;

    @Field("imp_sec_cons")
    private Float impSecCons;

    @Field("base_imp_arroz")
    private Float baseImpArroz;

    @Field("imp_vent_arroz")
    private Float impVentArroz;

    @Field("otros_no_base_imp")
    private Float otrosNoBaseImp;

    @NotNull
    @Field("importe_total_comp")
    private Double importeTotalComp;

    @NotNull
    @Field("cod_moneda")
    private String codMoneda;

    @NotNull
    @Field("tip_cambio")
    private Float tipCambio;

    @Field("fec_emi_modif")
    private ZonedDateTime fecEmiModif;

    @Field("tip_comp_modif")
    private String tipCompModif;

    @Field("nro_serie_comp_modif")
    private String nroSerieCompModif;

    @Field("nro_comp_modif")
    private String nroCompModif;

    @Field("ident_contrato")
    private String identContrato;

    @Field("err_tip_uno")
    private String errTipUno;

    @Field("ind_comp_vanc_mp")
    private String indCompVancMp;

    @Field("estado_opera_canc_mp")
    private String estadoOperaCancMp;

    @Field("campo_libre")
    private String campoLibre;

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
    @Field("servidor")
    @JsonIgnoreProperties(value = "regVentas", allowSetters = true)
    private Orden servidor;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPeriodo() {
        return periodo;
    }

    public RegVenta periodo(String periodo) {
        this.periodo = periodo;
        return this;
    }

    public void setPeriodo(String periodo) {
        this.periodo = periodo;
    }

    public String getMes() {
        return mes;
    }

    public RegVenta mes(String mes) {
        this.mes = mes;
        return this;
    }

    public void setMes(String mes) {
        this.mes = mes;
    }

    public String getAsientContab() {
        return asientContab;
    }

    public RegVenta asientContab(String asientContab) {
        this.asientContab = asientContab;
        return this;
    }

    public void setAsientContab(String asientContab) {
        this.asientContab = asientContab;
    }

    public ZonedDateTime getFecEmiComp() {
        return fecEmiComp;
    }

    public RegVenta fecEmiComp(ZonedDateTime fecEmiComp) {
        this.fecEmiComp = fecEmiComp;
        return this;
    }

    public void setFecEmiComp(ZonedDateTime fecEmiComp) {
        this.fecEmiComp = fecEmiComp;
    }

    public ZonedDateTime getFecVencComp() {
        return fecVencComp;
    }

    public RegVenta fecVencComp(ZonedDateTime fecVencComp) {
        this.fecVencComp = fecVencComp;
        return this;
    }

    public void setFecVencComp(ZonedDateTime fecVencComp) {
        this.fecVencComp = fecVencComp;
    }

    public String getTipComp() {
        return tipComp;
    }

    public RegVenta tipComp(String tipComp) {
        this.tipComp = tipComp;
        return this;
    }

    public void setTipComp(String tipComp) {
        this.tipComp = tipComp;
    }

    public String getNroSerieComp() {
        return nroSerieComp;
    }

    public RegVenta nroSerieComp(String nroSerieComp) {
        this.nroSerieComp = nroSerieComp;
        return this;
    }

    public void setNroSerieComp(String nroSerieComp) {
        this.nroSerieComp = nroSerieComp;
    }

    public String getNroComp() {
        return nroComp;
    }

    public RegVenta nroComp(String nroComp) {
        this.nroComp = nroComp;
        return this;
    }

    public void setNroComp(String nroComp) {
        this.nroComp = nroComp;
    }

    public String getConsoDia() {
        return consoDia;
    }

    public RegVenta consoDia(String consoDia) {
        this.consoDia = consoDia;
        return this;
    }

    public void setConsoDia(String consoDia) {
        this.consoDia = consoDia;
    }

    public String getTipDocCli() {
        return tipDocCli;
    }

    public RegVenta tipDocCli(String tipDocCli) {
        this.tipDocCli = tipDocCli;
        return this;
    }

    public void setTipDocCli(String tipDocCli) {
        this.tipDocCli = tipDocCli;
    }

    public String getNroDocCli() {
        return nroDocCli;
    }

    public RegVenta nroDocCli(String nroDocCli) {
        this.nroDocCli = nroDocCli;
        return this;
    }

    public void setNroDocCli(String nroDocCli) {
        this.nroDocCli = nroDocCli;
    }

    public String getApeRazSocCli() {
        return apeRazSocCli;
    }

    public RegVenta apeRazSocCli(String apeRazSocCli) {
        this.apeRazSocCli = apeRazSocCli;
        return this;
    }

    public void setApeRazSocCli(String apeRazSocCli) {
        this.apeRazSocCli = apeRazSocCli;
    }

    public Double getValFacExpor() {
        return valFacExpor;
    }

    public RegVenta valFacExpor(Double valFacExpor) {
        this.valFacExpor = valFacExpor;
        return this;
    }

    public void setValFacExpor(Double valFacExpor) {
        this.valFacExpor = valFacExpor;
    }

    public Double getBaseImpOperGrav() {
        return baseImpOperGrav;
    }

    public RegVenta baseImpOperGrav(Double baseImpOperGrav) {
        this.baseImpOperGrav = baseImpOperGrav;
        return this;
    }

    public void setBaseImpOperGrav(Double baseImpOperGrav) {
        this.baseImpOperGrav = baseImpOperGrav;
    }

    public Double getDsctoBaseImp() {
        return dsctoBaseImp;
    }

    public RegVenta dsctoBaseImp(Double dsctoBaseImp) {
        this.dsctoBaseImp = dsctoBaseImp;
        return this;
    }

    public void setDsctoBaseImp(Double dsctoBaseImp) {
        this.dsctoBaseImp = dsctoBaseImp;
    }

    public Float getIgvIpm() {
        return igvIpm;
    }

    public RegVenta igvIpm(Float igvIpm) {
        this.igvIpm = igvIpm;
        return this;
    }

    public void setIgvIpm(Float igvIpm) {
        this.igvIpm = igvIpm;
    }

    public Float getDsctoIgvIpm() {
        return dsctoIgvIpm;
    }

    public RegVenta dsctoIgvIpm(Float dsctoIgvIpm) {
        this.dsctoIgvIpm = dsctoIgvIpm;
        return this;
    }

    public void setDsctoIgvIpm(Float dsctoIgvIpm) {
        this.dsctoIgvIpm = dsctoIgvIpm;
    }

    public Float getImpOpeExo() {
        return impOpeExo;
    }

    public RegVenta impOpeExo(Float impOpeExo) {
        this.impOpeExo = impOpeExo;
        return this;
    }

    public void setImpOpeExo(Float impOpeExo) {
        this.impOpeExo = impOpeExo;
    }

    public Float getImpTotOpeInafec() {
        return impTotOpeInafec;
    }

    public RegVenta impTotOpeInafec(Float impTotOpeInafec) {
        this.impTotOpeInafec = impTotOpeInafec;
        return this;
    }

    public void setImpTotOpeInafec(Float impTotOpeInafec) {
        this.impTotOpeInafec = impTotOpeInafec;
    }

    public Float getImpSecCons() {
        return impSecCons;
    }

    public RegVenta impSecCons(Float impSecCons) {
        this.impSecCons = impSecCons;
        return this;
    }

    public void setImpSecCons(Float impSecCons) {
        this.impSecCons = impSecCons;
    }

    public Float getBaseImpArroz() {
        return baseImpArroz;
    }

    public RegVenta baseImpArroz(Float baseImpArroz) {
        this.baseImpArroz = baseImpArroz;
        return this;
    }

    public void setBaseImpArroz(Float baseImpArroz) {
        this.baseImpArroz = baseImpArroz;
    }

    public Float getImpVentArroz() {
        return impVentArroz;
    }

    public RegVenta impVentArroz(Float impVentArroz) {
        this.impVentArroz = impVentArroz;
        return this;
    }

    public void setImpVentArroz(Float impVentArroz) {
        this.impVentArroz = impVentArroz;
    }

    public Float getOtrosNoBaseImp() {
        return otrosNoBaseImp;
    }

    public RegVenta otrosNoBaseImp(Float otrosNoBaseImp) {
        this.otrosNoBaseImp = otrosNoBaseImp;
        return this;
    }

    public void setOtrosNoBaseImp(Float otrosNoBaseImp) {
        this.otrosNoBaseImp = otrosNoBaseImp;
    }

    public Double getImporteTotalComp() {
        return importeTotalComp;
    }

    public RegVenta importeTotalComp(Double importeTotalComp) {
        this.importeTotalComp = importeTotalComp;
        return this;
    }

    public void setImporteTotalComp(Double importeTotalComp) {
        this.importeTotalComp = importeTotalComp;
    }

    public String getCodMoneda() {
        return codMoneda;
    }

    public RegVenta codMoneda(String codMoneda) {
        this.codMoneda = codMoneda;
        return this;
    }

    public void setCodMoneda(String codMoneda) {
        this.codMoneda = codMoneda;
    }

    public Float getTipCambio() {
        return tipCambio;
    }

    public RegVenta tipCambio(Float tipCambio) {
        this.tipCambio = tipCambio;
        return this;
    }

    public void setTipCambio(Float tipCambio) {
        this.tipCambio = tipCambio;
    }

    public ZonedDateTime getFecEmiModif() {
        return fecEmiModif;
    }

    public RegVenta fecEmiModif(ZonedDateTime fecEmiModif) {
        this.fecEmiModif = fecEmiModif;
        return this;
    }

    public void setFecEmiModif(ZonedDateTime fecEmiModif) {
        this.fecEmiModif = fecEmiModif;
    }

    public String getTipCompModif() {
        return tipCompModif;
    }

    public RegVenta tipCompModif(String tipCompModif) {
        this.tipCompModif = tipCompModif;
        return this;
    }

    public void setTipCompModif(String tipCompModif) {
        this.tipCompModif = tipCompModif;
    }

    public String getNroSerieCompModif() {
        return nroSerieCompModif;
    }

    public RegVenta nroSerieCompModif(String nroSerieCompModif) {
        this.nroSerieCompModif = nroSerieCompModif;
        return this;
    }

    public void setNroSerieCompModif(String nroSerieCompModif) {
        this.nroSerieCompModif = nroSerieCompModif;
    }

    public String getNroCompModif() {
        return nroCompModif;
    }

    public RegVenta nroCompModif(String nroCompModif) {
        this.nroCompModif = nroCompModif;
        return this;
    }

    public void setNroCompModif(String nroCompModif) {
        this.nroCompModif = nroCompModif;
    }

    public String getIdentContrato() {
        return identContrato;
    }

    public RegVenta identContrato(String identContrato) {
        this.identContrato = identContrato;
        return this;
    }

    public void setIdentContrato(String identContrato) {
        this.identContrato = identContrato;
    }

    public String getErrTipUno() {
        return errTipUno;
    }

    public RegVenta errTipUno(String errTipUno) {
        this.errTipUno = errTipUno;
        return this;
    }

    public void setErrTipUno(String errTipUno) {
        this.errTipUno = errTipUno;
    }

    public String getIndCompVancMp() {
        return indCompVancMp;
    }

    public RegVenta indCompVancMp(String indCompVancMp) {
        this.indCompVancMp = indCompVancMp;
        return this;
    }

    public void setIndCompVancMp(String indCompVancMp) {
        this.indCompVancMp = indCompVancMp;
    }

    public String getEstadoOperaCancMp() {
        return estadoOperaCancMp;
    }

    public RegVenta estadoOperaCancMp(String estadoOperaCancMp) {
        this.estadoOperaCancMp = estadoOperaCancMp;
        return this;
    }

    public void setEstadoOperaCancMp(String estadoOperaCancMp) {
        this.estadoOperaCancMp = estadoOperaCancMp;
    }

    public String getCampoLibre() {
        return campoLibre;
    }

    public RegVenta campoLibre(String campoLibre) {
        this.campoLibre = campoLibre;
        return this;
    }

    public void setCampoLibre(String campoLibre) {
        this.campoLibre = campoLibre;
    }

    public Boolean isIndDel() {
        return indDel;
    }

    public RegVenta indDel(Boolean indDel) {
        this.indDel = indDel;
        return this;
    }

    public void setIndDel(Boolean indDel) {
        this.indDel = indDel;
    }

    public ZonedDateTime getFecCrea() {
        return fecCrea;
    }

    public RegVenta fecCrea(ZonedDateTime fecCrea) {
        this.fecCrea = fecCrea;
        return this;
    }

    public void setFecCrea(ZonedDateTime fecCrea) {
        this.fecCrea = fecCrea;
    }

    public String getUsuCrea() {
        return usuCrea;
    }

    public RegVenta usuCrea(String usuCrea) {
        this.usuCrea = usuCrea;
        return this;
    }

    public void setUsuCrea(String usuCrea) {
        this.usuCrea = usuCrea;
    }

    public String getIpCrea() {
        return ipCrea;
    }

    public RegVenta ipCrea(String ipCrea) {
        this.ipCrea = ipCrea;
        return this;
    }

    public void setIpCrea(String ipCrea) {
        this.ipCrea = ipCrea;
    }

    public ZonedDateTime getFecModif() {
        return fecModif;
    }

    public RegVenta fecModif(ZonedDateTime fecModif) {
        this.fecModif = fecModif;
        return this;
    }

    public void setFecModif(ZonedDateTime fecModif) {
        this.fecModif = fecModif;
    }

    public String getUsuModif() {
        return usuModif;
    }

    public RegVenta usuModif(String usuModif) {
        this.usuModif = usuModif;
        return this;
    }

    public void setUsuModif(String usuModif) {
        this.usuModif = usuModif;
    }

    public String getIpModif() {
        return ipModif;
    }

    public RegVenta ipModif(String ipModif) {
        this.ipModif = ipModif;
        return this;
    }

    public void setIpModif(String ipModif) {
        this.ipModif = ipModif;
    }

    public Orden getServidor() {
        return servidor;
    }

    public RegVenta servidor(Orden orden) {
        this.servidor = orden;
        return this;
    }

    public void setServidor(Orden orden) {
        this.servidor = orden;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof RegVenta)) {
            return false;
        }
        return id != null && id.equals(((RegVenta) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "RegVenta{" +
            "id=" + getId() +
            ", periodo='" + getPeriodo() + "'" +
            ", mes='" + getMes() + "'" +
            ", asientContab='" + getAsientContab() + "'" +
            ", fecEmiComp='" + getFecEmiComp() + "'" +
            ", fecVencComp='" + getFecVencComp() + "'" +
            ", tipComp='" + getTipComp() + "'" +
            ", nroSerieComp='" + getNroSerieComp() + "'" +
            ", nroComp='" + getNroComp() + "'" +
            ", consoDia='" + getConsoDia() + "'" +
            ", tipDocCli='" + getTipDocCli() + "'" +
            ", nroDocCli='" + getNroDocCli() + "'" +
            ", apeRazSocCli='" + getApeRazSocCli() + "'" +
            ", valFacExpor=" + getValFacExpor() +
            ", baseImpOperGrav=" + getBaseImpOperGrav() +
            ", dsctoBaseImp=" + getDsctoBaseImp() +
            ", igvIpm=" + getIgvIpm() +
            ", dsctoIgvIpm=" + getDsctoIgvIpm() +
            ", impOpeExo=" + getImpOpeExo() +
            ", impTotOpeInafec=" + getImpTotOpeInafec() +
            ", impSecCons=" + getImpSecCons() +
            ", baseImpArroz=" + getBaseImpArroz() +
            ", impVentArroz=" + getImpVentArroz() +
            ", otrosNoBaseImp=" + getOtrosNoBaseImp() +
            ", importeTotalComp=" + getImporteTotalComp() +
            ", codMoneda='" + getCodMoneda() + "'" +
            ", tipCambio=" + getTipCambio() +
            ", fecEmiModif='" + getFecEmiModif() + "'" +
            ", tipCompModif='" + getTipCompModif() + "'" +
            ", nroSerieCompModif='" + getNroSerieCompModif() + "'" +
            ", nroCompModif='" + getNroCompModif() + "'" +
            ", identContrato='" + getIdentContrato() + "'" +
            ", errTipUno='" + getErrTipUno() + "'" +
            ", indCompVancMp='" + getIndCompVancMp() + "'" +
            ", estadoOperaCancMp='" + getEstadoOperaCancMp() + "'" +
            ", campoLibre='" + getCampoLibre() + "'" +
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
