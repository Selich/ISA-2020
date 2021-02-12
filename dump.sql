--
-- PostgreSQL database dump
--

-- Dumped from database version 12.5 (Ubuntu 12.5-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.5 (Ubuntu 12.5-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: employee_role_enum; Type: TYPE; Schema: public; Owner: isa_super
--

CREATE TYPE public.employee_role_enum AS ENUM (
    'patient',
    'derm',
    'pharm',
    'admin',
    'sysadmin'
);


ALTER TYPE public.employee_role_enum OWNER TO isa_super;

--
-- Name: patient_role_enum; Type: TYPE; Schema: public; Owner: isa_super
--

CREATE TYPE public.patient_role_enum AS ENUM (
    'patient',
    'derm',
    'pharm',
    'admin',
    'sysadmin'
);


ALTER TYPE public.patient_role_enum OWNER TO isa_super;

--
-- Name: user_role_enum; Type: TYPE; Schema: public; Owner: isa_super
--

CREATE TYPE public.user_role_enum AS ENUM (
    'patient',
    'derm',
    'pharm',
    'admin',
    'sysadmin'
);


ALTER TYPE public.user_role_enum OWNER TO isa_super;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: address; Type: TABLE; Schema: public; Owner: isa_super
--

CREATE TABLE public.address (
    id integer NOT NULL,
    version integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    street character varying,
    city character varying,
    country character varying
);


ALTER TABLE public.address OWNER TO isa_super;

--
-- Name: address_id_seq; Type: SEQUENCE; Schema: public; Owner: isa_super
--

CREATE SEQUENCE public.address_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.address_id_seq OWNER TO isa_super;

--
-- Name: address_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: isa_super
--

ALTER SEQUENCE public.address_id_seq OWNED BY public.address.id;


--
-- Name: appointment; Type: TABLE; Schema: public; Owner: isa_super
--

CREATE TABLE public.appointment (
    id integer NOT NULL,
    version integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    kind character varying,
    score integer,
    price integer,
    discount integer,
    report character varying,
    "isVisited" boolean,
    begin character varying,
    length integer,
    "patientId" integer,
    "employeeId" integer,
    "pharmacyId" integer,
    "prescriptionId" integer
);


ALTER TABLE public.appointment OWNER TO isa_super;

--
-- Name: appointment_definition; Type: TABLE; Schema: public; Owner: isa_super
--

CREATE TABLE public.appointment_definition (
    id integer NOT NULL,
    version integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    kind character varying,
    score integer,
    price integer,
    "pharmacyId" integer
);


ALTER TABLE public.appointment_definition OWNER TO isa_super;

--
-- Name: appointment_definition_id_seq; Type: SEQUENCE; Schema: public; Owner: isa_super
--

CREATE SEQUENCE public.appointment_definition_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.appointment_definition_id_seq OWNER TO isa_super;

--
-- Name: appointment_definition_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: isa_super
--

ALTER SEQUENCE public.appointment_definition_id_seq OWNED BY public.appointment_definition.id;


--
-- Name: appointment_id_seq; Type: SEQUENCE; Schema: public; Owner: isa_super
--

CREATE SEQUENCE public.appointment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.appointment_id_seq OWNER TO isa_super;

--
-- Name: appointment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: isa_super
--

ALTER SEQUENCE public.appointment_id_seq OWNED BY public.appointment.id;


--
-- Name: complaint; Type: TABLE; Schema: public; Owner: isa_super
--

CREATE TABLE public.complaint (
    id integer NOT NULL,
    version integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    description character varying,
    "patientId" integer,
    "employeeId" integer,
    "pharmacyId" integer
);


ALTER TABLE public.complaint OWNER TO isa_super;

--
-- Name: complaint_id_seq; Type: SEQUENCE; Schema: public; Owner: isa_super
--

CREATE SEQUENCE public.complaint_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.complaint_id_seq OWNER TO isa_super;

--
-- Name: complaint_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: isa_super
--

ALTER SEQUENCE public.complaint_id_seq OWNED BY public.complaint.id;


--
-- Name: e_prescription; Type: TABLE; Schema: public; Owner: isa_super
--

CREATE TABLE public.e_prescription (
    id integer NOT NULL,
    version integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "hashCode" character varying,
    "dateOfGrant" character varying,
    status character varying,
    "patientId" integer,
    "pharmacyId" integer
);


ALTER TABLE public.e_prescription OWNER TO isa_super;

--
-- Name: e_prescription_id_seq; Type: SEQUENCE; Schema: public; Owner: isa_super
--

CREATE SEQUENCE public.e_prescription_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.e_prescription_id_seq OWNER TO isa_super;

--
-- Name: e_prescription_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: isa_super
--

ALTER SEQUENCE public.e_prescription_id_seq OWNED BY public.e_prescription.id;


--
-- Name: employee; Type: TABLE; Schema: public; Owner: isa_super
--

CREATE TABLE public.employee (
    id integer NOT NULL,
    version integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    email character varying,
    password character varying,
    role public.employee_role_enum,
    "firstName" character varying,
    "lastName" character varying,
    telephone character varying,
    "averageRating" integer DEFAULT 0,
    "addressId" integer,
    "pharmacyId" integer,
    "isEnabled" boolean DEFAULT false NOT NULL
);


ALTER TABLE public.employee OWNER TO isa_super;

--
-- Name: employee_id_seq; Type: SEQUENCE; Schema: public; Owner: isa_super
--

CREATE SEQUENCE public.employee_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.employee_id_seq OWNER TO isa_super;

--
-- Name: employee_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: isa_super
--

ALTER SEQUENCE public.employee_id_seq OWNED BY public.employee.id;


--
-- Name: holiday; Type: TABLE; Schema: public; Owner: isa_super
--

CREATE TABLE public.holiday (
    id integer NOT NULL,
    version integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "from" character varying,
    until character varying,
    "isApproved" boolean,
    comments character varying,
    "employeeId" integer
);


ALTER TABLE public.holiday OWNER TO isa_super;

--
-- Name: holiday_id_seq; Type: SEQUENCE; Schema: public; Owner: isa_super
--

CREATE SEQUENCE public.holiday_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.holiday_id_seq OWNER TO isa_super;

--
-- Name: holiday_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: isa_super
--

ALTER SEQUENCE public.holiday_id_seq OWNED BY public.holiday.id;


--
-- Name: inventory; Type: TABLE; Schema: public; Owner: isa_super
--

CREATE TABLE public.inventory (
    id integer NOT NULL,
    version integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.inventory OWNER TO isa_super;

--
-- Name: inventory_id_seq; Type: SEQUENCE; Schema: public; Owner: isa_super
--

CREATE SEQUENCE public.inventory_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.inventory_id_seq OWNER TO isa_super;

--
-- Name: inventory_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: isa_super
--

ALTER SEQUENCE public.inventory_id_seq OWNED BY public.inventory.id;


--
-- Name: medicine; Type: TABLE; Schema: public; Owner: isa_super
--

CREATE TABLE public.medicine (
    id integer NOT NULL,
    version integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    code character varying NOT NULL,
    name character varying,
    kind character varying,
    points integer,
    form character varying,
    contents character varying,
    producer character varying,
    rating integer,
    "isPrescriptionRequired" boolean DEFAULT false,
    info character varying
);


ALTER TABLE public.medicine OWNER TO isa_super;

--
-- Name: medicine_id_seq; Type: SEQUENCE; Schema: public; Owner: isa_super
--

CREATE SEQUENCE public.medicine_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.medicine_id_seq OWNER TO isa_super;

--
-- Name: medicine_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: isa_super
--

ALTER SEQUENCE public.medicine_id_seq OWNED BY public.medicine.id;


--
-- Name: medicine_item; Type: TABLE; Schema: public; Owner: isa_super
--

CREATE TABLE public.medicine_item (
    id integer NOT NULL,
    version integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    quantity integer,
    "currentPrice" integer,
    "dateOfPurchase" character varying,
    instructions character varying,
    "detailsId" integer,
    "listId" integer
);


ALTER TABLE public.medicine_item OWNER TO isa_super;

--
-- Name: medicine_item_id_seq; Type: SEQUENCE; Schema: public; Owner: isa_super
--

CREATE SEQUENCE public.medicine_item_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.medicine_item_id_seq OWNER TO isa_super;

--
-- Name: medicine_item_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: isa_super
--

ALTER SEQUENCE public.medicine_item_id_seq OWNED BY public.medicine_item.id;


--
-- Name: medicine_list; Type: TABLE; Schema: public; Owner: isa_super
--

CREATE TABLE public.medicine_list (
    id integer NOT NULL,
    version integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.medicine_list OWNER TO isa_super;

--
-- Name: medicine_list_id_seq; Type: SEQUENCE; Schema: public; Owner: isa_super
--

CREATE SEQUENCE public.medicine_list_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.medicine_list_id_seq OWNER TO isa_super;

--
-- Name: medicine_list_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: isa_super
--

ALTER SEQUENCE public.medicine_list_id_seq OWNED BY public.medicine_list.id;


--
-- Name: medicine_request; Type: TABLE; Schema: public; Owner: isa_super
--

CREATE TABLE public.medicine_request (
    id integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "medicineId" integer,
    "pharmacyId" integer,
    "employeeId" integer
);


ALTER TABLE public.medicine_request OWNER TO isa_super;

--
-- Name: medicine_request_id_seq; Type: SEQUENCE; Schema: public; Owner: isa_super
--

CREATE SEQUENCE public.medicine_request_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.medicine_request_id_seq OWNER TO isa_super;

--
-- Name: medicine_request_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: isa_super
--

ALTER SEQUENCE public.medicine_request_id_seq OWNED BY public.medicine_request.id;


--
-- Name: migrations; Type: TABLE; Schema: public; Owner: isa_super
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    "timestamp" bigint NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.migrations OWNER TO isa_super;

--
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: isa_super
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.migrations_id_seq OWNER TO isa_super;

--
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: isa_super
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- Name: model; Type: TABLE; Schema: public; Owner: isa_super
--

CREATE TABLE public.model (
    id integer NOT NULL,
    version integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.model OWNER TO isa_super;

--
-- Name: model_id_seq; Type: SEQUENCE; Schema: public; Owner: isa_super
--

CREATE SEQUENCE public.model_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.model_id_seq OWNER TO isa_super;

--
-- Name: model_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: isa_super
--

ALTER SEQUENCE public.model_id_seq OWNED BY public.model.id;


--
-- Name: order; Type: TABLE; Schema: public; Owner: isa_super
--

CREATE TABLE public."order" (
    id integer NOT NULL,
    version integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public."order" OWNER TO isa_super;

--
-- Name: order_id_seq; Type: SEQUENCE; Schema: public; Owner: isa_super
--

CREATE SEQUENCE public.order_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.order_id_seq OWNER TO isa_super;

--
-- Name: order_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: isa_super
--

ALTER SEQUENCE public.order_id_seq OWNED BY public."order".id;


--
-- Name: patient; Type: TABLE; Schema: public; Owner: isa_super
--

CREATE TABLE public.patient (
    id integer NOT NULL,
    version integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    email character varying,
    password character varying,
    role public.patient_role_enum,
    "firstName" character varying,
    "lastName" character varying,
    telephone character varying,
    score integer,
    penalty integer,
    "addressId" integer,
    "tierId" integer,
    "isEnabled" boolean DEFAULT false NOT NULL
);


ALTER TABLE public.patient OWNER TO isa_super;

--
-- Name: patient_id_seq; Type: SEQUENCE; Schema: public; Owner: isa_super
--

CREATE SEQUENCE public.patient_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.patient_id_seq OWNER TO isa_super;

--
-- Name: patient_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: isa_super
--

ALTER SEQUENCE public.patient_id_seq OWNED BY public.patient.id;


--
-- Name: patient_subscriptions_pharmacy; Type: TABLE; Schema: public; Owner: isa_super
--

CREATE TABLE public.patient_subscriptions_pharmacy (
    "patientId" integer NOT NULL,
    "pharmacyId" integer NOT NULL
);


ALTER TABLE public.patient_subscriptions_pharmacy OWNER TO isa_super;

--
-- Name: pharmacy; Type: TABLE; Schema: public; Owner: isa_super
--

CREATE TABLE public.pharmacy (
    id integer NOT NULL,
    version integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    name character varying,
    long character varying,
    lat character varying,
    "averageRating" integer,
    "addressId" integer,
    "inventoryId" integer
);


ALTER TABLE public.pharmacy OWNER TO isa_super;

--
-- Name: pharmacy_id_seq; Type: SEQUENCE; Schema: public; Owner: isa_super
--

CREATE SEQUENCE public.pharmacy_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.pharmacy_id_seq OWNER TO isa_super;

--
-- Name: pharmacy_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: isa_super
--

ALTER SEQUENCE public.pharmacy_id_seq OWNED BY public.pharmacy.id;


--
-- Name: prescription; Type: TABLE; Schema: public; Owner: isa_super
--

CREATE TABLE public.prescription (
    id integer NOT NULL,
    version integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    type character varying NOT NULL,
    deadline timestamp without time zone,
    "patientId" integer,
    "employeeId" integer
);


ALTER TABLE public.prescription OWNER TO isa_super;

--
-- Name: prescription_id_seq; Type: SEQUENCE; Schema: public; Owner: isa_super
--

CREATE SEQUENCE public.prescription_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.prescription_id_seq OWNER TO isa_super;

--
-- Name: prescription_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: isa_super
--

ALTER SEQUENCE public.prescription_id_seq OWNED BY public.prescription.id;


--
-- Name: price; Type: TABLE; Schema: public; Owner: isa_super
--

CREATE TABLE public.price (
    id integer NOT NULL,
    version integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    price integer NOT NULL,
    "from" character varying NOT NULL,
    "pharmacyId" integer,
    "medicineItemId" integer
);


ALTER TABLE public.price OWNER TO isa_super;

--
-- Name: price_id_seq; Type: SEQUENCE; Schema: public; Owner: isa_super
--

CREATE SEQUENCE public.price_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.price_id_seq OWNER TO isa_super;

--
-- Name: price_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: isa_super
--

ALTER SEQUENCE public.price_id_seq OWNED BY public.price.id;


--
-- Name: rating; Type: TABLE; Schema: public; Owner: isa_super
--

CREATE TABLE public.rating (
    id integer NOT NULL,
    version integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    rating integer NOT NULL,
    "patientId" integer,
    "employeeId" integer,
    "pharmacyId" integer,
    "medicineId" integer
);


ALTER TABLE public.rating OWNER TO isa_super;

--
-- Name: rating_id_seq; Type: SEQUENCE; Schema: public; Owner: isa_super
--

CREATE SEQUENCE public.rating_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.rating_id_seq OWNER TO isa_super;

--
-- Name: rating_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: isa_super
--

ALTER SEQUENCE public.rating_id_seq OWNED BY public.rating.id;


--
-- Name: reservation; Type: TABLE; Schema: public; Owner: isa_super
--

CREATE TABLE public.reservation (
    id integer NOT NULL,
    version integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    deadline character varying,
    "pickupDate" character varying,
    "isBought" boolean,
    "totalSum" integer,
    "pharmacyId" integer,
    "patientId" integer,
    "medicineItemId" integer
);


ALTER TABLE public.reservation OWNER TO isa_super;

--
-- Name: reservation_id_seq; Type: SEQUENCE; Schema: public; Owner: isa_super
--

CREATE SEQUENCE public.reservation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.reservation_id_seq OWNER TO isa_super;

--
-- Name: reservation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: isa_super
--

ALTER SEQUENCE public.reservation_id_seq OWNED BY public.reservation.id;


--
-- Name: tier; Type: TABLE; Schema: public; Owner: isa_super
--

CREATE TABLE public.tier (
    id integer NOT NULL,
    version integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    name character varying NOT NULL,
    discount integer NOT NULL,
    "scoreMin" integer NOT NULL,
    "scoreMax" integer NOT NULL
);


ALTER TABLE public.tier OWNER TO isa_super;

--
-- Name: tier_id_seq; Type: SEQUENCE; Schema: public; Owner: isa_super
--

CREATE SEQUENCE public.tier_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tier_id_seq OWNER TO isa_super;

--
-- Name: tier_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: isa_super
--

ALTER SEQUENCE public.tier_id_seq OWNED BY public.tier.id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: isa_super
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    version integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    email character varying,
    password character varying,
    role public.user_role_enum,
    "firstName" character varying,
    "lastName" character varying,
    telephone character varying,
    "addressId" integer,
    "isEnabled" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."user" OWNER TO isa_super;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: isa_super
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_id_seq OWNER TO isa_super;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: isa_super
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- Name: working_hours; Type: TABLE; Schema: public; Owner: isa_super
--

CREATE TABLE public.working_hours (
    id integer NOT NULL,
    version integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "from" character varying,
    until character varying,
    "employeeId" integer,
    "pharmacyId" integer
);


ALTER TABLE public.working_hours OWNER TO isa_super;

--
-- Name: working_hours_id_seq; Type: SEQUENCE; Schema: public; Owner: isa_super
--

CREATE SEQUENCE public.working_hours_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.working_hours_id_seq OWNER TO isa_super;

--
-- Name: working_hours_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: isa_super
--

ALTER SEQUENCE public.working_hours_id_seq OWNED BY public.working_hours.id;


--
-- Name: address id; Type: DEFAULT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.address ALTER COLUMN id SET DEFAULT nextval('public.address_id_seq'::regclass);


--
-- Name: appointment id; Type: DEFAULT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.appointment ALTER COLUMN id SET DEFAULT nextval('public.appointment_id_seq'::regclass);


--
-- Name: appointment_definition id; Type: DEFAULT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.appointment_definition ALTER COLUMN id SET DEFAULT nextval('public.appointment_definition_id_seq'::regclass);


--
-- Name: complaint id; Type: DEFAULT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.complaint ALTER COLUMN id SET DEFAULT nextval('public.complaint_id_seq'::regclass);


--
-- Name: e_prescription id; Type: DEFAULT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.e_prescription ALTER COLUMN id SET DEFAULT nextval('public.e_prescription_id_seq'::regclass);


--
-- Name: employee id; Type: DEFAULT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.employee ALTER COLUMN id SET DEFAULT nextval('public.employee_id_seq'::regclass);


--
-- Name: holiday id; Type: DEFAULT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.holiday ALTER COLUMN id SET DEFAULT nextval('public.holiday_id_seq'::regclass);


--
-- Name: inventory id; Type: DEFAULT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.inventory ALTER COLUMN id SET DEFAULT nextval('public.inventory_id_seq'::regclass);


--
-- Name: medicine id; Type: DEFAULT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.medicine ALTER COLUMN id SET DEFAULT nextval('public.medicine_id_seq'::regclass);


--
-- Name: medicine_item id; Type: DEFAULT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.medicine_item ALTER COLUMN id SET DEFAULT nextval('public.medicine_item_id_seq'::regclass);


--
-- Name: medicine_list id; Type: DEFAULT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.medicine_list ALTER COLUMN id SET DEFAULT nextval('public.medicine_list_id_seq'::regclass);


--
-- Name: medicine_request id; Type: DEFAULT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.medicine_request ALTER COLUMN id SET DEFAULT nextval('public.medicine_request_id_seq'::regclass);


--
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- Name: model id; Type: DEFAULT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.model ALTER COLUMN id SET DEFAULT nextval('public.model_id_seq'::regclass);


--
-- Name: order id; Type: DEFAULT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public."order" ALTER COLUMN id SET DEFAULT nextval('public.order_id_seq'::regclass);


--
-- Name: patient id; Type: DEFAULT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.patient ALTER COLUMN id SET DEFAULT nextval('public.patient_id_seq'::regclass);


--
-- Name: pharmacy id; Type: DEFAULT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.pharmacy ALTER COLUMN id SET DEFAULT nextval('public.pharmacy_id_seq'::regclass);


--
-- Name: prescription id; Type: DEFAULT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.prescription ALTER COLUMN id SET DEFAULT nextval('public.prescription_id_seq'::regclass);


--
-- Name: price id; Type: DEFAULT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.price ALTER COLUMN id SET DEFAULT nextval('public.price_id_seq'::regclass);


--
-- Name: rating id; Type: DEFAULT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.rating ALTER COLUMN id SET DEFAULT nextval('public.rating_id_seq'::regclass);


--
-- Name: reservation id; Type: DEFAULT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.reservation ALTER COLUMN id SET DEFAULT nextval('public.reservation_id_seq'::regclass);


--
-- Name: tier id; Type: DEFAULT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.tier ALTER COLUMN id SET DEFAULT nextval('public.tier_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Name: working_hours id; Type: DEFAULT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.working_hours ALTER COLUMN id SET DEFAULT nextval('public.working_hours_id_seq'::regclass);


--
-- Data for Name: address; Type: TABLE DATA; Schema: public; Owner: isa_super
--

COPY public.address (id, version, "createdAt", "updatedAt", street, city, country) FROM stdin;
1	1	2021-02-12 00:05:21.278	2021-02-12 00:05:21.278	Nesto Misddica	Uzice	Serbia
2	1	2021-02-12 01:06:20.696	2021-02-12 01:06:20.696	Bulevar deposta Stefana 7a	Novi Sad	Serbia
\.


--
-- Data for Name: appointment; Type: TABLE DATA; Schema: public; Owner: isa_super
--

COPY public.appointment (id, version, "createdAt", "updatedAt", kind, score, price, discount, report, "isVisited", begin, length, "patientId", "employeeId", "pharmacyId", "prescriptionId") FROM stdin;
\.


--
-- Data for Name: appointment_definition; Type: TABLE DATA; Schema: public; Owner: isa_super
--

COPY public.appointment_definition (id, version, "createdAt", "updatedAt", kind, score, price, "pharmacyId") FROM stdin;
\.


--
-- Data for Name: complaint; Type: TABLE DATA; Schema: public; Owner: isa_super
--

COPY public.complaint (id, version, "createdAt", "updatedAt", description, "patientId", "employeeId", "pharmacyId") FROM stdin;
\.


--
-- Data for Name: e_prescription; Type: TABLE DATA; Schema: public; Owner: isa_super
--

COPY public.e_prescription (id, version, "createdAt", "updatedAt", "hashCode", "dateOfGrant", status, "patientId", "pharmacyId") FROM stdin;
\.


--
-- Data for Name: employee; Type: TABLE DATA; Schema: public; Owner: isa_super
--

COPY public.employee (id, version, "createdAt", "updatedAt", email, password, role, "firstName", "lastName", telephone, "averageRating", "addressId", "pharmacyId", "isEnabled") FROM stdin;
2	1	2021-02-12 03:35:13.716458	2021-02-12 03:35:13.716458	s@email.com	\N	sysadmin	\N	\N	\N	0	\N	\N	f
4	1	2021-02-12 11:32:46.981305	2021-02-12 11:32:46.981305	derm@email.com	pass	derm	\N	\N	\N	0	\N	\N	f
5	1	2021-02-12 11:32:56.662118	2021-02-12 11:32:56.662118	pharm@email.com	pass	pharm	\N	\N	\N	0	\N	\N	f
6	1	2021-02-12 12:52:32.297	2021-02-12 12:52:32.297	selich.work@gmail.com	$2b$10$k3yucFDtA.Lc869BHXw2oOrHuthM0WXtHn5GQjSMJ/tGG9Jo.xTMe	\N	Nikola	Selic	+381604232240	0	1	\N	f
7	1	2021-02-12 12:53:19.089	2021-02-12 12:53:19.089	jlazarevic@gmail.co	$2b$10$w9MgYkmxAvlx24457CCEreELpp1wSVIJRCpjyCv9HI4Q9tWHnsnAi	\N	Jovana	Lazarevic	+381604232240	0	\N	\N	f
8	1	2021-02-12 13:38:14.484	2021-02-12 13:38:14.484	derm2@email.com	$2b$10$/6hXGVx8qvG31Ii.mT9GSePhe4cj2HOm1yuGVjpIR.8xv2U.6ywu2	derm	Nikola	Selic	+381604232240	0	\N	\N	f
9	1	2021-02-12 13:44:13.187	2021-02-12 13:44:13.187	dd@email.com	$2b$10$fXCyA8zzeRmOxN61Pt.iheVurKJnDjiJyd0H7QS27tC53UrSBPXC2	derm	Nikola	Selic	+381604232240	0	\N	\N	f
\.


--
-- Data for Name: holiday; Type: TABLE DATA; Schema: public; Owner: isa_super
--

COPY public.holiday (id, version, "createdAt", "updatedAt", "from", until, "isApproved", comments, "employeeId") FROM stdin;
\.


--
-- Data for Name: inventory; Type: TABLE DATA; Schema: public; Owner: isa_super
--

COPY public.inventory (id, version, "createdAt", "updatedAt") FROM stdin;
1	1	2021-02-12 00:05:21.33	2021-02-12 00:05:21.33
2	1	2021-02-12 00:05:21.33	2021-02-12 00:05:21.33
4	1	2021-02-12 00:05:49.441	2021-02-12 00:05:49.441
6	1	2021-02-12 00:06:05.688	2021-02-12 00:06:05.688
8	1	2021-02-12 01:10:09.497	2021-02-12 01:10:09.497
10	1	2021-02-12 01:12:12.971	2021-02-12 01:12:12.971
12	1	2021-02-12 01:12:36.16	2021-02-12 01:12:36.16
\.


--
-- Data for Name: medicine; Type: TABLE DATA; Schema: public; Owner: isa_super
--

COPY public.medicine (id, version, "createdAt", "updatedAt", code, name, kind, points, form, contents, producer, rating, "isPrescriptionRequired", info) FROM stdin;
1	1	2021-02-12 00:07:05.942	2021-02-12 00:07:05.942	2	Tableta	Syrup	2	\N	\N	\N	3	f	\N
\.


--
-- Data for Name: medicine_item; Type: TABLE DATA; Schema: public; Owner: isa_super
--

COPY public.medicine_item (id, version, "createdAt", "updatedAt", quantity, "currentPrice", "dateOfPurchase", instructions, "detailsId", "listId") FROM stdin;
3	1	2021-02-12 00:09:01.082	2021-02-12 00:09:01.082	2	122	\N	\N	1	2
2	2	2021-02-12 00:09:01.082	2021-02-12 00:09:01.305819	2	122	\N	\N	1	\N
4	2	2021-02-12 00:09:16.575	2021-02-12 00:09:16.707725	2	122	\N	\N	1	\N
6	2	2021-02-12 01:12:50.209	2021-02-12 01:12:50.397158	2	122	\N	\N	1	\N
8	1	2021-02-12 01:31:24.483	2021-02-12 01:31:24.483	2	122	\N	\N	1	\N
9	1	2021-02-12 01:31:44.74	2021-02-12 01:31:44.74	2	122	\N	\N	1	\N
10	1	2021-02-12 01:31:55.517	2021-02-12 01:31:55.517	2	122	\N	\N	1	\N
11	1	2021-02-12 01:41:23.082	2021-02-12 01:41:23.082	2	122	\N	\N	1	\N
12	1	2021-02-12 01:41:52.145	2021-02-12 01:41:52.145	2	122	\N	\N	1	\N
14	1	2021-02-12 01:42:44.145	2021-02-12 01:42:44.145	2	122	\N	\N	1	1
13	2	2021-02-12 01:42:44.145	2021-02-12 01:42:44.375792	2	122	\N	\N	1	\N
15	1	2021-02-12 02:02:54.695	2021-02-12 02:02:54.695	2	122	\N	\N	1	\N
16	1	2021-02-12 02:03:11.242	2021-02-12 02:03:11.242	2	122	\N	\N	1	\N
17	1	2021-02-12 02:04:13.498	2021-02-12 02:04:13.498	2	122	\N	\N	1	\N
18	1	2021-02-12 02:04:39.641	2021-02-12 02:04:39.641	2	122	\N	\N	1	\N
19	1	2021-02-12 02:04:51.939	2021-02-12 02:04:51.939	2	122	\N	\N	1	\N
1	11	2021-02-12 00:07:20.315	2021-02-12 02:04:52.08518	-18	122	\N	\N	1	2
20	1	2021-02-12 02:05:35.063	2021-02-12 02:05:35.063	2	122	\N	\N	1	\N
21	1	2021-02-12 02:05:36.062	2021-02-12 02:05:36.062	2	122	\N	\N	1	\N
22	1	2021-02-12 03:04:30.723	2021-02-12 03:04:30.723	2	122	\N	\N	1	\N
23	1	2021-02-12 03:05:32.884	2021-02-12 03:05:32.884	2	122	\N	\N	1	\N
24	1	2021-02-12 03:06:45.861	2021-02-12 03:06:45.861	2	122	\N	\N	1	\N
25	1	2021-02-12 03:18:15.742	2021-02-12 03:18:15.742	2	122	\N	\N	1	\N
26	1	2021-02-12 03:19:07.765	2021-02-12 03:19:07.765	2	122	\N	\N	1	\N
27	1	2021-02-12 03:19:16.149	2021-02-12 03:19:16.149	2	122	\N	\N	1	\N
5	15	2021-02-12 00:09:16.575	2021-02-12 03:19:16.253918	-2	122	\N	\N	1	1
28	1	2021-02-12 03:21:03.052	2021-02-12 03:21:03.052	2	122	\N	\N	1	\N
29	1	2021-02-12 03:21:55.913	2021-02-12 03:21:55.913	2	122	\N	\N	1	\N
30	1	2021-02-12 03:22:27.319	2021-02-12 03:22:27.319	2	122	\N	\N	1	\N
31	1	2021-02-12 03:23:18.504	2021-02-12 03:23:18.504	2	122	\N	\N	1	\N
32	1	2021-02-12 03:23:41.207	2021-02-12 03:23:41.207	2	122	\N	\N	1	\N
33	1	2021-02-12 03:25:15.58	2021-02-12 03:25:15.58	2	122	\N	\N	1	\N
34	1	2021-02-12 03:25:40.447	2021-02-12 03:25:40.447	2	122	\N	\N	1	\N
35	1	2021-02-12 03:28:05.14	2021-02-12 03:28:05.14	2	122	\N	\N	1	\N
36	1	2021-02-12 03:29:25.931	2021-02-12 03:29:25.931	2	122	\N	\N	1	\N
37	1	2021-02-12 03:30:01.047	2021-02-12 03:30:01.047	2	122	\N	\N	1	\N
7	11	2021-02-12 01:12:50.209	2021-02-12 03:30:01.191542	-18	122	\N	\N	1	1
\.


--
-- Data for Name: medicine_list; Type: TABLE DATA; Schema: public; Owner: isa_super
--

COPY public.medicine_list (id, version, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: medicine_request; Type: TABLE DATA; Schema: public; Owner: isa_super
--

COPY public.medicine_request (id, "createdAt", "updatedAt", "medicineId", "pharmacyId", "employeeId") FROM stdin;
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: isa_super
--

COPY public.migrations (id, "timestamp", name) FROM stdin;
\.


--
-- Data for Name: model; Type: TABLE DATA; Schema: public; Owner: isa_super
--

COPY public.model (id, version, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: order; Type: TABLE DATA; Schema: public; Owner: isa_super
--

COPY public."order" (id, version, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: patient; Type: TABLE DATA; Schema: public; Owner: isa_super
--

COPY public.patient (id, version, "createdAt", "updatedAt", email, password, role, "firstName", "lastName", telephone, score, penalty, "addressId", "tierId", "isEnabled") FROM stdin;
1	1	2021-02-12 01:06:20.658	2021-02-12 01:06:20.658	selich.work@gmail.com	$argon2i$v=19$m=4096,t=3,p=1$r9ptUrcBYH+HqTNXl+b9FA$3AZtmfEHAqrBPX5LMNDwUrDZy6SRY/BgdOhJrt1MMDs	patient	Nikola	Selic	+381604232240	0	0	2	\N	f
2	1	2021-02-12 02:07:05.229	2021-02-12 02:07:05.229	jlazarevic.ftn@gmail.com	$argon2i$v=19$m=4096,t=3,p=1$bXC5EUDpcG2558Er4j91lQ$FlFrEui4PI69UynJfeVYoAMqFntGF/HKZSJMaS6arvg	patient	Jovana	Lazarevic	+381604232240	0	0	2	\N	f
3	1	2021-02-12 02:31:25.812	2021-02-12 02:31:25.812	patient@email.com	$argon2i$v=19$m=4096,t=3,p=1$ONvslIlngtLL+78iZm7CQw$12VsJichJc7TIQAZS5SfJ6ahR+amo5yHB+OkAgMbb5c	patient	Nikola	Selic	+381604232240	0	0	2	\N	f
\.


--
-- Data for Name: patient_subscriptions_pharmacy; Type: TABLE DATA; Schema: public; Owner: isa_super
--

COPY public.patient_subscriptions_pharmacy ("patientId", "pharmacyId") FROM stdin;
\.


--
-- Data for Name: pharmacy; Type: TABLE DATA; Schema: public; Owner: isa_super
--

COPY public.pharmacy (id, version, "createdAt", "updatedAt", name, long, lat, "averageRating", "addressId", "inventoryId") FROM stdin;
1	1	2021-02-12 00:05:21.259	2021-02-12 00:05:21.259	Apoteka dd	\N	\N	\N	1	1
\.


--
-- Data for Name: prescription; Type: TABLE DATA; Schema: public; Owner: isa_super
--

COPY public.prescription (id, version, "createdAt", "updatedAt", type, deadline, "patientId", "employeeId") FROM stdin;
\.


--
-- Data for Name: price; Type: TABLE DATA; Schema: public; Owner: isa_super
--

COPY public.price (id, version, "createdAt", "updatedAt", price, "from", "pharmacyId", "medicineItemId") FROM stdin;
1	1	2021-02-12 00:07:20.315	2021-02-12 00:07:20.315	122	2021-02-12T00:07:20.315+01:00	\N	1
2	1	2021-02-12 00:09:01.082	2021-02-12 00:09:01.082	122	2021-02-12T00:09:01.082+01:00	\N	2
3	1	2021-02-12 00:09:01.082	2021-02-12 00:09:01.082	122	2021-02-12T00:09:01.082+01:00	\N	3
4	1	2021-02-12 00:09:16.575	2021-02-12 00:09:16.575	122	2021-02-12T00:09:16.575+01:00	\N	4
5	1	2021-02-12 00:09:16.575	2021-02-12 00:09:16.575	122	2021-02-12T00:09:16.575+01:00	\N	5
6	1	2021-02-12 01:12:50.209	2021-02-12 01:12:50.209	122	2021-02-12T01:12:50.209+01:00	\N	6
7	1	2021-02-12 01:12:50.209	2021-02-12 01:12:50.209	122	2021-02-12T01:12:50.209+01:00	\N	7
8	1	2021-02-12 01:42:44.145	2021-02-12 01:42:44.145	122	2021-02-12T01:42:44.145+01:00	\N	13
9	1	2021-02-12 01:42:44.145	2021-02-12 01:42:44.145	122	2021-02-12T01:42:44.145+01:00	\N	14
\.


--
-- Data for Name: rating; Type: TABLE DATA; Schema: public; Owner: isa_super
--

COPY public.rating (id, version, "createdAt", "updatedAt", rating, "patientId", "employeeId", "pharmacyId", "medicineId") FROM stdin;
\.


--
-- Data for Name: reservation; Type: TABLE DATA; Schema: public; Owner: isa_super
--

COPY public.reservation (id, version, "createdAt", "updatedAt", deadline, "pickupDate", "isBought", "totalSum", "pharmacyId", "patientId", "medicineItemId") FROM stdin;
\.


--
-- Data for Name: tier; Type: TABLE DATA; Schema: public; Owner: isa_super
--

COPY public.tier (id, version, "createdAt", "updatedAt", name, discount, "scoreMin", "scoreMax") FROM stdin;
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: isa_super
--

COPY public."user" (id, version, "createdAt", "updatedAt", email, password, role, "firstName", "lastName", telephone, "addressId", "isEnabled") FROM stdin;
\.


--
-- Data for Name: working_hours; Type: TABLE DATA; Schema: public; Owner: isa_super
--

COPY public.working_hours (id, version, "createdAt", "updatedAt", "from", until, "employeeId", "pharmacyId") FROM stdin;
\.


--
-- Name: address_id_seq; Type: SEQUENCE SET; Schema: public; Owner: isa_super
--

SELECT pg_catalog.setval('public.address_id_seq', 2, true);


--
-- Name: appointment_definition_id_seq; Type: SEQUENCE SET; Schema: public; Owner: isa_super
--

SELECT pg_catalog.setval('public.appointment_definition_id_seq', 1, false);


--
-- Name: appointment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: isa_super
--

SELECT pg_catalog.setval('public.appointment_id_seq', 1, false);


--
-- Name: complaint_id_seq; Type: SEQUENCE SET; Schema: public; Owner: isa_super
--

SELECT pg_catalog.setval('public.complaint_id_seq', 1, false);


--
-- Name: e_prescription_id_seq; Type: SEQUENCE SET; Schema: public; Owner: isa_super
--

SELECT pg_catalog.setval('public.e_prescription_id_seq', 1, false);


--
-- Name: employee_id_seq; Type: SEQUENCE SET; Schema: public; Owner: isa_super
--

SELECT pg_catalog.setval('public.employee_id_seq', 9, true);


--
-- Name: holiday_id_seq; Type: SEQUENCE SET; Schema: public; Owner: isa_super
--

SELECT pg_catalog.setval('public.holiday_id_seq', 1, false);


--
-- Name: inventory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: isa_super
--

SELECT pg_catalog.setval('public.inventory_id_seq', 12, true);


--
-- Name: medicine_id_seq; Type: SEQUENCE SET; Schema: public; Owner: isa_super
--

SELECT pg_catalog.setval('public.medicine_id_seq', 1, true);


--
-- Name: medicine_item_id_seq; Type: SEQUENCE SET; Schema: public; Owner: isa_super
--

SELECT pg_catalog.setval('public.medicine_item_id_seq', 37, true);


--
-- Name: medicine_list_id_seq; Type: SEQUENCE SET; Schema: public; Owner: isa_super
--

SELECT pg_catalog.setval('public.medicine_list_id_seq', 1, false);


--
-- Name: medicine_request_id_seq; Type: SEQUENCE SET; Schema: public; Owner: isa_super
--

SELECT pg_catalog.setval('public.medicine_request_id_seq', 1, false);


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: isa_super
--

SELECT pg_catalog.setval('public.migrations_id_seq', 1, false);


--
-- Name: model_id_seq; Type: SEQUENCE SET; Schema: public; Owner: isa_super
--

SELECT pg_catalog.setval('public.model_id_seq', 1, false);


--
-- Name: order_id_seq; Type: SEQUENCE SET; Schema: public; Owner: isa_super
--

SELECT pg_catalog.setval('public.order_id_seq', 1, false);


--
-- Name: patient_id_seq; Type: SEQUENCE SET; Schema: public; Owner: isa_super
--

SELECT pg_catalog.setval('public.patient_id_seq', 3, true);


--
-- Name: pharmacy_id_seq; Type: SEQUENCE SET; Schema: public; Owner: isa_super
--

SELECT pg_catalog.setval('public.pharmacy_id_seq', 6, true);


--
-- Name: prescription_id_seq; Type: SEQUENCE SET; Schema: public; Owner: isa_super
--

SELECT pg_catalog.setval('public.prescription_id_seq', 1, false);


--
-- Name: price_id_seq; Type: SEQUENCE SET; Schema: public; Owner: isa_super
--

SELECT pg_catalog.setval('public.price_id_seq', 9, true);


--
-- Name: rating_id_seq; Type: SEQUENCE SET; Schema: public; Owner: isa_super
--

SELECT pg_catalog.setval('public.rating_id_seq', 1, false);


--
-- Name: reservation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: isa_super
--

SELECT pg_catalog.setval('public.reservation_id_seq', 1, false);


--
-- Name: tier_id_seq; Type: SEQUENCE SET; Schema: public; Owner: isa_super
--

SELECT pg_catalog.setval('public.tier_id_seq', 1, false);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: isa_super
--

SELECT pg_catalog.setval('public.user_id_seq', 1, false);


--
-- Name: working_hours_id_seq; Type: SEQUENCE SET; Schema: public; Owner: isa_super
--

SELECT pg_catalog.setval('public.working_hours_id_seq', 1, false);


--
-- Name: order PK_1031171c13130102495201e3e20; Type: CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public."order"
    ADD CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY (id);


--
-- Name: tier PK_14d67ceef0dbea040e39e97e7f6; Type: CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.tier
    ADD CONSTRAINT "PK_14d67ceef0dbea040e39e97e7f6" PRIMARY KEY (id);


--
-- Name: appointment_definition PK_353dcc6d057fdf3515ad1664be0; Type: CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.appointment_definition
    ADD CONSTRAINT "PK_353dcc6d057fdf3515ad1664be0" PRIMARY KEY (id);


--
-- Name: employee PK_3c2bc72f03fd5abbbc5ac169498; Type: CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.employee
    ADD CONSTRAINT "PK_3c2bc72f03fd5abbbc5ac169498" PRIMARY KEY (id);


--
-- Name: holiday PK_3e7492c25f80418a7aad0aec053; Type: CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.holiday
    ADD CONSTRAINT "PK_3e7492c25f80418a7aad0aec053" PRIMARY KEY (id);


--
-- Name: reservation PK_48b1f9922368359ab88e8bfa525; Type: CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.reservation
    ADD CONSTRAINT "PK_48b1f9922368359ab88e8bfa525" PRIMARY KEY (id);


--
-- Name: working_hours PK_5f84d2fa3953367fe9d704d8df6; Type: CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.working_hours
    ADD CONSTRAINT "PK_5f84d2fa3953367fe9d704d8df6" PRIMARY KEY (id);


--
-- Name: inventory PK_82aa5da437c5bbfb80703b08309; Type: CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.inventory
    ADD CONSTRAINT "PK_82aa5da437c5bbfb80703b08309" PRIMARY KEY (id);


--
-- Name: medicine_item PK_82c3889ee82e59885f25026c1c3; Type: CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.medicine_item
    ADD CONSTRAINT "PK_82c3889ee82e59885f25026c1c3" PRIMARY KEY (id);


--
-- Name: migrations PK_8c82d7f526340ab734260ea46be; Type: CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY (id);


--
-- Name: patient PK_8dfa510bb29ad31ab2139fbfb99; Type: CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.patient
    ADD CONSTRAINT "PK_8dfa510bb29ad31ab2139fbfb99" PRIMARY KEY (id);


--
-- Name: medicine_request PK_a2011293ea7758bdb6ae728762a; Type: CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.medicine_request
    ADD CONSTRAINT "PK_a2011293ea7758bdb6ae728762a" PRIMARY KEY (id);


--
-- Name: complaint PK_a9c8dbc2ab4988edcc2ff0a7337; Type: CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.complaint
    ADD CONSTRAINT "PK_a9c8dbc2ab4988edcc2ff0a7337" PRIMARY KEY (id);


--
-- Name: medicine PK_b9e0e6f37b7cadb5f402390928b; Type: CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.medicine
    ADD CONSTRAINT "PK_b9e0e6f37b7cadb5f402390928b" PRIMARY KEY (id);


--
-- Name: e_prescription PK_c38f57cda6973c9c23cbef255c6; Type: CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.e_prescription
    ADD CONSTRAINT "PK_c38f57cda6973c9c23cbef255c6" PRIMARY KEY (id);


--
-- Name: patient_subscriptions_pharmacy PK_c6360da5210afce3aeed5a9089a; Type: CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.patient_subscriptions_pharmacy
    ADD CONSTRAINT "PK_c6360da5210afce3aeed5a9089a" PRIMARY KEY ("patientId", "pharmacyId");


--
-- Name: user PK_cace4a159ff9f2512dd42373760; Type: CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);


--
-- Name: medicine_list PK_cfd6eacfdd2b206b1d5e96731ba; Type: CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.medicine_list
    ADD CONSTRAINT "PK_cfd6eacfdd2b206b1d5e96731ba" PRIMARY KEY (id);


--
-- Name: price PK_d163e55e8cce6908b2e0f27cea4; Type: CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.price
    ADD CONSTRAINT "PK_d163e55e8cce6908b2e0f27cea4" PRIMARY KEY (id);


--
-- Name: model PK_d6df271bba301d5cc79462912a4; Type: CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.model
    ADD CONSTRAINT "PK_d6df271bba301d5cc79462912a4" PRIMARY KEY (id);


--
-- Name: address PK_d92de1f82754668b5f5f5dd4fd5; Type: CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.address
    ADD CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY (id);


--
-- Name: appointment PK_e8be1a53027415e709ce8a2db74; Type: CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.appointment
    ADD CONSTRAINT "PK_e8be1a53027415e709ce8a2db74" PRIMARY KEY (id);


--
-- Name: prescription PK_eaba5e4414e5382781e08467b51; Type: CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.prescription
    ADD CONSTRAINT "PK_eaba5e4414e5382781e08467b51" PRIMARY KEY (id);


--
-- Name: rating PK_ecda8ad32645327e4765b43649e; Type: CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.rating
    ADD CONSTRAINT "PK_ecda8ad32645327e4765b43649e" PRIMARY KEY (id);


--
-- Name: pharmacy PK_f6712b909f461cf4fe9926e0c5d; Type: CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.pharmacy
    ADD CONSTRAINT "PK_f6712b909f461cf4fe9926e0c5d" PRIMARY KEY (id);


--
-- Name: pharmacy REL_10d5831c66f8a1a46826dbd408; Type: CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.pharmacy
    ADD CONSTRAINT "REL_10d5831c66f8a1a46826dbd408" UNIQUE ("inventoryId");


--
-- Name: appointment REL_42491e9c6a079301ffdf905e30; Type: CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.appointment
    ADD CONSTRAINT "REL_42491e9c6a079301ffdf905e30" UNIQUE ("prescriptionId");


--
-- Name: pharmacy REL_49f3660b11d1c6ec5f1f201431; Type: CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.pharmacy
    ADD CONSTRAINT "REL_49f3660b11d1c6ec5f1f201431" UNIQUE ("addressId");


--
-- Name: reservation REL_ce96b449ecd1b1ed2f0b2e2b73; Type: CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.reservation
    ADD CONSTRAINT "REL_ce96b449ecd1b1ed2f0b2e2b73" UNIQUE ("medicineItemId");


--
-- Name: medicine UQ_a7bbdd1d9a1f8995d52c35ae1a3; Type: CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.medicine
    ADD CONSTRAINT "UQ_a7bbdd1d9a1f8995d52c35ae1a3" UNIQUE (code);


--
-- Name: IDX_37692b8afe6b61412f56c46315; Type: INDEX; Schema: public; Owner: isa_super
--

CREATE INDEX "IDX_37692b8afe6b61412f56c46315" ON public.patient_subscriptions_pharmacy USING btree ("pharmacyId");


--
-- Name: IDX_49752dd2541aaa9e1b60becd4d; Type: INDEX; Schema: public; Owner: isa_super
--

CREATE INDEX "IDX_49752dd2541aaa9e1b60becd4d" ON public.patient_subscriptions_pharmacy USING btree ("patientId");


--
-- Name: complaint FK_02bb7b0b408ce9d0d37330b51b0; Type: FK CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.complaint
    ADD CONSTRAINT "FK_02bb7b0b408ce9d0d37330b51b0" FOREIGN KEY ("patientId") REFERENCES public.patient(id);


--
-- Name: e_prescription FK_03c5926a501324b6f36973c1506; Type: FK CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.e_prescription
    ADD CONSTRAINT "FK_03c5926a501324b6f36973c1506" FOREIGN KEY ("patientId") REFERENCES public.patient(id);


--
-- Name: complaint FK_06aff3d57e7fdd62467dc318657; Type: FK CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.complaint
    ADD CONSTRAINT "FK_06aff3d57e7fdd62467dc318657" FOREIGN KEY ("employeeId") REFERENCES public.employee(id);


--
-- Name: employee FK_077451aeab187ae60b0b35eb082; Type: FK CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.employee
    ADD CONSTRAINT "FK_077451aeab187ae60b0b35eb082" FOREIGN KEY ("pharmacyId") REFERENCES public.pharmacy(id);


--
-- Name: reservation FK_0f93ae897aff015e823b323098d; Type: FK CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.reservation
    ADD CONSTRAINT "FK_0f93ae897aff015e823b323098d" FOREIGN KEY ("pharmacyId") REFERENCES public.pharmacy(id);


--
-- Name: pharmacy FK_10d5831c66f8a1a46826dbd4088; Type: FK CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.pharmacy
    ADD CONSTRAINT "FK_10d5831c66f8a1a46826dbd4088" FOREIGN KEY ("inventoryId") REFERENCES public.inventory(id);


--
-- Name: patient FK_11f8e4427b8128da5cdfbeac909; Type: FK CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.patient
    ADD CONSTRAINT "FK_11f8e4427b8128da5cdfbeac909" FOREIGN KEY ("addressId") REFERENCES public.address(id);


--
-- Name: patient FK_1c2f0bca0ab5332325aa375d87b; Type: FK CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.patient
    ADD CONSTRAINT "FK_1c2f0bca0ab5332325aa375d87b" FOREIGN KEY ("tierId") REFERENCES public.tier(id);


--
-- Name: user FK_217ba147c5de6c107f2fa7fa271; Type: FK CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "FK_217ba147c5de6c107f2fa7fa271" FOREIGN KEY ("addressId") REFERENCES public.address(id);


--
-- Name: patient_subscriptions_pharmacy FK_37692b8afe6b61412f56c46315a; Type: FK CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.patient_subscriptions_pharmacy
    ADD CONSTRAINT "FK_37692b8afe6b61412f56c46315a" FOREIGN KEY ("pharmacyId") REFERENCES public.pharmacy(id) ON DELETE CASCADE;


--
-- Name: appointment FK_395df0ff38bf6a9b65c52ad80ce; Type: FK CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.appointment
    ADD CONSTRAINT "FK_395df0ff38bf6a9b65c52ad80ce" FOREIGN KEY ("pharmacyId") REFERENCES public.pharmacy(id);


--
-- Name: appointment FK_42491e9c6a079301ffdf905e308; Type: FK CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.appointment
    ADD CONSTRAINT "FK_42491e9c6a079301ffdf905e308" FOREIGN KEY ("prescriptionId") REFERENCES public.prescription(id);


--
-- Name: patient_subscriptions_pharmacy FK_49752dd2541aaa9e1b60becd4d8; Type: FK CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.patient_subscriptions_pharmacy
    ADD CONSTRAINT "FK_49752dd2541aaa9e1b60becd4d8" FOREIGN KEY ("patientId") REFERENCES public.patient(id) ON DELETE CASCADE;


--
-- Name: pharmacy FK_49f3660b11d1c6ec5f1f201431f; Type: FK CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.pharmacy
    ADD CONSTRAINT "FK_49f3660b11d1c6ec5f1f201431f" FOREIGN KEY ("addressId") REFERENCES public.address(id);


--
-- Name: complaint FK_4fa64385b7f5f42618b906bde68; Type: FK CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.complaint
    ADD CONSTRAINT "FK_4fa64385b7f5f42618b906bde68" FOREIGN KEY ("pharmacyId") REFERENCES public.pharmacy(id);


--
-- Name: appointment FK_5ce4c3130796367c93cd817948e; Type: FK CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.appointment
    ADD CONSTRAINT "FK_5ce4c3130796367c93cd817948e" FOREIGN KEY ("patientId") REFERENCES public.patient(id);


--
-- Name: medicine_request FK_5d357dc991004241023bdcbba60; Type: FK CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.medicine_request
    ADD CONSTRAINT "FK_5d357dc991004241023bdcbba60" FOREIGN KEY ("medicineId") REFERENCES public.medicine(id);


--
-- Name: reservation FK_67b21a33ec4df116ffa9921d616; Type: FK CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.reservation
    ADD CONSTRAINT "FK_67b21a33ec4df116ffa9921d616" FOREIGN KEY ("patientId") REFERENCES public.patient(id);


--
-- Name: medicine_request FK_67dc17248e359931205abe5fd26; Type: FK CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.medicine_request
    ADD CONSTRAINT "FK_67dc17248e359931205abe5fd26" FOREIGN KEY ("employeeId") REFERENCES public.employee(id);


--
-- Name: rating FK_6e38dd76bbc6d24e6d03dc97655; Type: FK CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.rating
    ADD CONSTRAINT "FK_6e38dd76bbc6d24e6d03dc97655" FOREIGN KEY ("patientId") REFERENCES public.patient(id);


--
-- Name: rating FK_76656cd9f8aada4971cdf12e1a8; Type: FK CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.rating
    ADD CONSTRAINT "FK_76656cd9f8aada4971cdf12e1a8" FOREIGN KEY ("medicineId") REFERENCES public.medicine(id);


--
-- Name: medicine_item FK_77ec666365e6f37989d7407f215; Type: FK CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.medicine_item
    ADD CONSTRAINT "FK_77ec666365e6f37989d7407f215" FOREIGN KEY ("listId") REFERENCES public.inventory(id);


--
-- Name: e_prescription FK_78a350b64bab2fc346318d3637a; Type: FK CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.e_prescription
    ADD CONSTRAINT "FK_78a350b64bab2fc346318d3637a" FOREIGN KEY ("pharmacyId") REFERENCES public.pharmacy(id);


--
-- Name: holiday FK_80938de963a23c4ae243d96e5d9; Type: FK CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.holiday
    ADD CONSTRAINT "FK_80938de963a23c4ae243d96e5d9" FOREIGN KEY ("employeeId") REFERENCES public.employee(id);


--
-- Name: working_hours FK_961da74fb96975fb75adc2e3f32; Type: FK CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.working_hours
    ADD CONSTRAINT "FK_961da74fb96975fb75adc2e3f32" FOREIGN KEY ("pharmacyId") REFERENCES public.pharmacy(id);


--
-- Name: price FK_9aa69c3d1f6dbb4e5ab9af04b8e; Type: FK CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.price
    ADD CONSTRAINT "FK_9aa69c3d1f6dbb4e5ab9af04b8e" FOREIGN KEY ("medicineItemId") REFERENCES public.medicine_item(id);


--
-- Name: employee FK_9db63829e525f028ccc7de5f9e7; Type: FK CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.employee
    ADD CONSTRAINT "FK_9db63829e525f028ccc7de5f9e7" FOREIGN KEY ("addressId") REFERENCES public.address(id);


--
-- Name: appointment_definition FK_a0aefe40deaa47d9cf19228664f; Type: FK CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.appointment_definition
    ADD CONSTRAINT "FK_a0aefe40deaa47d9cf19228664f" FOREIGN KEY ("pharmacyId") REFERENCES public.pharmacy(id);


--
-- Name: medicine_request FK_accd3f90aad97add2f4eb38b05b; Type: FK CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.medicine_request
    ADD CONSTRAINT "FK_accd3f90aad97add2f4eb38b05b" FOREIGN KEY ("pharmacyId") REFERENCES public.pharmacy(id);


--
-- Name: rating FK_b6bb33dfe37003c32c5552647e0; Type: FK CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.rating
    ADD CONSTRAINT "FK_b6bb33dfe37003c32c5552647e0" FOREIGN KEY ("pharmacyId") REFERENCES public.pharmacy(id);


--
-- Name: appointment FK_b6e57758a28acd843878b1f30d8; Type: FK CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.appointment
    ADD CONSTRAINT "FK_b6e57758a28acd843878b1f30d8" FOREIGN KEY ("employeeId") REFERENCES public.employee(id);


--
-- Name: medicine_item FK_c4219076847bc1942c7fb3685a9; Type: FK CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.medicine_item
    ADD CONSTRAINT "FK_c4219076847bc1942c7fb3685a9" FOREIGN KEY ("detailsId") REFERENCES public.medicine(id);


--
-- Name: reservation FK_ce96b449ecd1b1ed2f0b2e2b736; Type: FK CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.reservation
    ADD CONSTRAINT "FK_ce96b449ecd1b1ed2f0b2e2b736" FOREIGN KEY ("medicineItemId") REFERENCES public.medicine_item(id);


--
-- Name: price FK_d25db5b9e3f94364efb1c67000c; Type: FK CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.price
    ADD CONSTRAINT "FK_d25db5b9e3f94364efb1c67000c" FOREIGN KEY ("pharmacyId") REFERENCES public.pharmacy(id);


--
-- Name: prescription FK_d9d1ecabc97e4de5c07a1795279; Type: FK CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.prescription
    ADD CONSTRAINT "FK_d9d1ecabc97e4de5c07a1795279" FOREIGN KEY ("patientId") REFERENCES public.patient(id);


--
-- Name: rating FK_f2a79d76281a675b374b4b513ae; Type: FK CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.rating
    ADD CONSTRAINT "FK_f2a79d76281a675b374b4b513ae" FOREIGN KEY ("employeeId") REFERENCES public.employee(id);


--
-- Name: prescription FK_f8585f367d390aad061a35113a8; Type: FK CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.prescription
    ADD CONSTRAINT "FK_f8585f367d390aad061a35113a8" FOREIGN KEY ("employeeId") REFERENCES public.employee(id);


--
-- Name: working_hours FK_fcb026d00cc613c1cd388b21a30; Type: FK CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.working_hours
    ADD CONSTRAINT "FK_fcb026d00cc613c1cd388b21a30" FOREIGN KEY ("employeeId") REFERENCES public.employee(id);


--
-- PostgreSQL database dump complete
--

