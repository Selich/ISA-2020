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
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    type character varying,
    score integer,
    price integer,
    discount integer,
    report character varying,
    "isVisited" boolean,
    "patientId" integer,
    "employeeId" integer,
    "pharmacyId" integer,
    "prescriptionId" integer,
    begin character varying,
    "end" character varying
);


ALTER TABLE public.appointment OWNER TO isa_super;

--
-- Name: appointment_definition; Type: TABLE; Schema: public; Owner: isa_super
--

CREATE TABLE public.appointment_definition (
    id integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    type character varying,
    delta integer,
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
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    description character varying NOT NULL,
    "patientId" integer,
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
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "hashCode" character varying,
    "patientId" integer,
    "employeeId" integer,
    "dateOfGrant" character varying,
    status character varying
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
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    email character varying,
    password character varying,
    role public.employee_role_enum,
    "firstName" character varying,
    "lastName" character varying,
    gender character varying,
    "dateOfBirth" date,
    telephone character varying,
    "averageRating" integer DEFAULT 0,
    "addressId" integer,
    "pharmacyId" integer
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
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "from" timestamp without time zone,
    until timestamp without time zone,
    "isApproved" boolean,
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
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    code character varying NOT NULL,
    name character varying,
    type character varying,
    points integer,
    form character varying,
    contents character varying,
    producer character varying,
    "isPrescriptionRequired" boolean DEFAULT false NOT NULL,
    info character varying,
    "from" timestamp without time zone,
    until timestamp without time zone,
    rating integer
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
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    quantity integer,
    price integer,
    "dateOfPurchase" timestamp without time zone,
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
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    email character varying,
    password character varying,
    role public.patient_role_enum,
    "firstName" character varying,
    "lastName" character varying,
    gender character varying,
    "dateOfBirth" date,
    telephone character varying,
    score integer,
    penalty integer,
    "isEnabled" boolean DEFAULT false NOT NULL,
    "addressId" integer,
    "tierId" integer
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
-- Name: pharmacy; Type: TABLE; Schema: public; Owner: isa_super
--

CREATE TABLE public.pharmacy (
    id integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    name character varying,
    "addressId" integer,
    "inventoryId" integer,
    long character varying,
    lat character varying,
    "averageRating" integer
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
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    price integer NOT NULL,
    "from" timestamp without time zone NOT NULL,
    "pharmacyId" integer,
    "medicineId" integer
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
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    complain character varying NOT NULL,
    "patientId" integer,
    "employeeId" integer,
    "pharmacyId" integer
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
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    deadline date,
    "pickupDate" date,
    "isBought" boolean,
    "totalSum" integer,
    "pharmacyId" integer,
    "patientId" integer
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
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    email character varying,
    password character varying,
    role public.user_role_enum,
    "firstName" character varying,
    "lastName" character varying,
    gender character varying,
    "dateOfBirth" date,
    telephone character varying,
    "addressId" integer
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
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "pharmacyID" integer NOT NULL,
    "from" character varying NOT NULL,
    until character varying NOT NULL,
    "employeeId" integer
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

COPY public.address (id, "createdAt", "updatedAt", street, city, country) FROM stdin;
1	2021-01-31 16:24:57.674	2021-01-31 16:24:57.674	poenkareova 22	city	country
2	2021-02-08 23:41:38.75	2021-02-08 23:41:38.75	Bulevar deposta Stefana 7a	Novi Sad	Serbia
3	2021-02-09 02:17:20.93	2021-02-09 02:17:20.93	Street	City	Country
\.


--
-- Data for Name: appointment; Type: TABLE DATA; Schema: public; Owner: isa_super
--

COPY public.appointment (id, "createdAt", "updatedAt", type, score, price, discount, report, "isVisited", "patientId", "employeeId", "pharmacyId", "prescriptionId", begin, "end") FROM stdin;
4	2021-02-07 18:28:28.096228	2021-02-07 18:28:28.096228	examination	\N	\N	\N	\N	\N	34	1	5	\N	\N	\N
5	2021-02-07 18:28:42.383317	2021-02-07 18:28:42.383317	examination	\N	\N	\N	\N	\N	32	1	6	\N	\N	\N
3	2021-02-07 18:28:19.944936	2021-02-07 18:28:19.944936	examination	\N	\N	\N	\N	\N	35	1	5	\N	2020-02-05 23:11:11	\N
\.


--
-- Data for Name: appointment_definition; Type: TABLE DATA; Schema: public; Owner: isa_super
--

COPY public.appointment_definition (id, "createdAt", "updatedAt", type, delta, score, price, "pharmacyId") FROM stdin;
\.


--
-- Data for Name: complaint; Type: TABLE DATA; Schema: public; Owner: isa_super
--

COPY public.complaint (id, "createdAt", "updatedAt", description, "patientId", "pharmacyId") FROM stdin;
\.


--
-- Data for Name: e_prescription; Type: TABLE DATA; Schema: public; Owner: isa_super
--

COPY public.e_prescription (id, "createdAt", "updatedAt", "hashCode", "patientId", "employeeId", "dateOfGrant", status) FROM stdin;
3	2021-02-09 06:10:19.675196	2021-02-09 06:10:19.675196	\N	35	\N	2020-12-22	Nov
4	2021-02-09 06:10:49.474558	2021-02-09 06:10:49.474558	\N	35	\N	2019-12-22	Denied
\.


--
-- Data for Name: employee; Type: TABLE DATA; Schema: public; Owner: isa_super
--

COPY public.employee (id, "createdAt", "updatedAt", email, password, role, "firstName", "lastName", gender, "dateOfBirth", telephone, "averageRating", "addressId", "pharmacyId") FROM stdin;
1	2021-01-31 16:24:57.711	2021-01-31 16:24:57.711	derm@gmail	pass	derm	Nikola	Selic	male	1994-01-16	+381604232240	0	1	5
4	2021-02-09 03:28:27.548268	2021-02-09 03:28:27.548268	admin@gmail.com	pass	admin	\N	\N	\N	\N	\N	0	\N	\N
5	2021-02-09 04:15:14.779405	2021-02-09 04:15:14.779405	admin@gmail.com	password	admin	\N	\N	\N	\N	\N	0	\N	\N
6	2021-02-09 19:23:41.61169	2021-02-09 19:23:41.61169	sysadmin@gmail.com	password	sysadmin	\N	\N	\N	\N	\N	0	\N	\N
\.


--
-- Data for Name: holiday; Type: TABLE DATA; Schema: public; Owner: isa_super
--

COPY public.holiday (id, "createdAt", "updatedAt", "from", until, "isApproved", "employeeId") FROM stdin;
\.


--
-- Data for Name: inventory; Type: TABLE DATA; Schema: public; Owner: isa_super
--

COPY public.inventory (id, "createdAt", "updatedAt") FROM stdin;
1	2021-02-07 17:26:21.755673	2021-02-07 17:26:21.755673
2	2021-02-07 17:26:23.987381	2021-02-07 17:26:23.987381
3	2021-02-07 17:26:26.17477	2021-02-07 17:26:26.17477
\.


--
-- Data for Name: medicine; Type: TABLE DATA; Schema: public; Owner: isa_super
--

COPY public.medicine (id, "createdAt", "updatedAt", code, name, type, points, form, contents, producer, "isPrescriptionRequired", info, "from", until, rating) FROM stdin;
4	2021-02-07 17:02:05.952546	2021-02-07 17:02:05.952546	1229300	Laktuloza RP	emetik	\N	syrop	\N	Belupo Lijekovi i Kozmetika d.d.	f	\N	\N	\N	4
5	2021-02-07 17:02:46.980152	2021-02-07 17:02:46.980152	5129333	5-ASA	emetik	\N	supozitorija	\N	Slaviamed d.o.o.	f	\N	\N	\N	4
6	2021-02-07 17:03:30.971579	2021-02-07 17:03:30.971579	42511	Insuman Rapid	heparin	\N	tablet	\N	Vianex S.A - Plant B	f	\N	\N	\N	4
3	2021-02-07 16:59:23.330301	2021-02-07 16:59:23.330301	2157101	Daktanol	heparin	\N	oral gel	\N	Galenika a.d.	f	\N	\N	\N	4
\.


--
-- Data for Name: medicine_item; Type: TABLE DATA; Schema: public; Owner: isa_super
--

COPY public.medicine_item (id, "createdAt", "updatedAt", quantity, price, "dateOfPurchase", instructions, "detailsId", "listId") FROM stdin;
1	2021-02-07 17:30:21.327122	2021-02-07 17:30:21.327122	1	200	\N	\N	3	1
\.


--
-- Data for Name: medicine_list; Type: TABLE DATA; Schema: public; Owner: isa_super
--

COPY public.medicine_list (id, "createdAt", "updatedAt") FROM stdin;
1	2021-02-07 17:23:57.750397	2021-02-07 17:23:57.750397
2	2021-02-07 17:23:59.468702	2021-02-07 17:23:59.468702
3	2021-02-07 17:24:00.717268	2021-02-07 17:24:00.717268
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

COPY public.model (id, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: order; Type: TABLE DATA; Schema: public; Owner: isa_super
--

COPY public."order" (id, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: patient; Type: TABLE DATA; Schema: public; Owner: isa_super
--

COPY public.patient (id, "createdAt", "updatedAt", email, password, role, "firstName", "lastName", gender, "dateOfBirth", telephone, score, penalty, "isEnabled", "addressId", "tierId") FROM stdin;
55	2021-02-09 10:50:35.143	2021-02-09 10:50:35.143	jlazarevic@gmail.co	$argon2i$v=19$m=4096,t=3,p=1$qCcSpF3TRitX8hYgbdBncw$cU6U0m9MLtsCQpWzzhJPZfT9sb27XgaMSASlgc0ZGFI	patient	Jovana	Lazarevic	\N	\N	+381604232240	\N	\N	t	2	1
13	2021-02-06 16:41:02.788	2021-02-06 16:41:02.788	test@gmail.com	$argon2i$v=19$m=4096,t=3,p=1$9LdghlpCIChDuesLAT4Adw$/zzLfMH1scPsm3HmMoNICpwkmNR+n5qq8Khh5qX5gX4	patient	\N	Selic	\N	\N	\N	\N	0	f	\N	\N
14	2021-02-06 16:42:52.738	2021-02-06 16:42:52.738	dushan@gmail.com	$argon2i$v=19$m=4096,t=3,p=1$IjAC6dC6XTGisVxxFh/Axg$jOCAzvP2zpG9AlYoN3n+YRAG3CHyGWP0E8vBguUBbKw	patient	\N	Selic	\N	\N	\N	\N	0	f	\N	\N
15	2021-02-06 16:43:47.647	2021-02-06 16:43:47.647	betty82@ethereal.email	$argon2i$v=19$m=4096,t=3,p=1$ct/cxrhgE3Ed4buh2PGFAg$vVgq5LkP+zx+6dR6j/lsywQAwuP6vVJOT0Xhf7rpGho	patient	\N	Selic	\N	\N	\N	\N	0	f	\N	\N
16	2021-02-06 16:45:30.852	2021-02-06 16:45:30.852	testing@gmail.com	$argon2i$v=19$m=4096,t=3,p=1$bMYAX74dr+qAK2w86I3uIA$wm+lWD1WJvv1YwnfKa5Do74gPsfUOOAycXFtEeukikw	patient	\N	Selic	\N	\N	\N	\N	0	f	\N	\N
17	2021-02-06 16:47:45.037	2021-02-06 16:47:45.037	brrrr@gmail.com	$argon2i$v=19$m=4096,t=3,p=1$uhxOBS6jxXJwXvuuxHVJ2Q$ZkV/SrCQsqPrst/qZd77Ff50uGtaZVKYy7e4wg48KVw	patient	\N	Selic	\N	\N	\N	\N	0	f	\N	\N
18	2021-02-06 16:49:53.057	2021-02-06 16:49:53.057	selich.work@protonmail.com	$argon2i$v=19$m=4096,t=3,p=1$4kl5xSUg0cZiz7nFpNxLwA$PcX4bWQ2NgVXOGuASQmlnDcVtW7iRbjdjbkGfNFuWC0	patient	\N	Selic	\N	\N	\N	\N	0	f	\N	\N
19	2021-02-06 16:55:25.564	2021-02-06 16:55:25.564	testy@protonmail.com	$argon2i$v=19$m=4096,t=3,p=1$kFOlfkQLwIy4ObpjJd0epA$HzG6gtb52Oy0eiKjnBONr0eYJrmqOjPnUcmXeP4q93c	patient	\N	Selic	\N	\N	\N	\N	0	f	\N	\N
20	2021-02-06 16:56:37.434	2021-02-06 16:56:37.434	fff@protonmail.com	$argon2i$v=19$m=4096,t=3,p=1$heRzVxJCev0K3P7EoxSR5Q$qfMuFWOumLY1PJsjb1uGo5w4aZ8sSQKd+19DWtF1r/E	patient	\N	Selic	\N	\N	\N	\N	0	f	\N	\N
21	2021-02-06 17:00:57.6	2021-02-06 17:00:57.6	fffd@protonmail.com	$argon2i$v=19$m=4096,t=3,p=1$tiPB9ZE/4OgDjZSQJg7VRw$vP8yKwPsukeo7JgUwG56xLK0SCGURn9l61jjQF18TBo	patient	\N	Selic	\N	\N	\N	\N	0	f	\N	\N
22	2021-02-06 17:01:52.602	2021-02-06 17:01:52.602	fffdsd@protonmail.com	$argon2i$v=19$m=4096,t=3,p=1$o+GD3PksOpKs8UgYRPfHNg$KG6b/gvdQwiSUvvuXF6nujN+C0uLAMI88uvxJFTGgYk	patient	\N	Selic	\N	\N	\N	\N	0	f	\N	\N
23	2021-02-06 17:08:57.168	2021-02-06 17:08:57.168	douche@protonmail.com	$argon2i$v=19$m=4096,t=3,p=1$WkCIbMmCniNaF/Joeosw9Q$2m7uQhisrqUmDSx2VFW9kXNsNmkaYNNxNeRfh1BduhQ	patient	\N	Selic	\N	\N	\N	\N	0	f	\N	\N
24	2021-02-06 17:42:04.936	2021-02-06 17:43:34.174323	jkl@gmail.com	$argon2i$v=19$m=4096,t=3,p=1$g0XCfNAXHyMnKeFHozmEXg$yfVuxpd0L0DOR5dGPdYmdVlFbSMki4A6JZDmHwuYIV4	patient	\N	Selic	\N	\N	\N	\N	0	t	\N	\N
25	2021-02-06 17:43:40.512	2021-02-06 17:43:40.512	testgg@gmail.com	$argon2i$v=19$m=4096,t=3,p=1$6Yen+kn+hwe2OfSudIUIWg$W89VytUjoRQ31/noKvLfrgSu6pSRqcS0eIclwc2QP7s	patient	\N	Selic	\N	\N	\N	\N	0	f	\N	\N
26	2021-02-06 17:45:10.775	2021-02-06 17:45:10.775	buga@gmail.com	$argon2i$v=19$m=4096,t=3,p=1$U2JgvHfwvURjdo2qjopcWw$PRJ6or4PpZ4Hc8y3yFVJlYgOV2kmrX7MAtr3qHv/GCw	patient	\N	Selic	\N	\N	\N	\N	0	f	\N	\N
27	2021-02-06 17:46:06.661	2021-02-06 17:46:06.661	testtest@gmail.com	$argon2i$v=19$m=4096,t=3,p=1$Eco0msCOBPBdXfzqwKtNfg$oUdrmNqCv8Se1eDqZg2nogjQSfUCpk9I11NyuNwddMg	patient	\N	Selic	\N	\N	\N	\N	0	f	\N	\N
28	2021-02-06 17:46:50.18	2021-02-06 17:46:50.18	asdfasdf@gmail.com	$argon2i$v=19$m=4096,t=3,p=1$WriHw8HUz0IZuKF0SiUUMA$uvtXyvS/nuB+GLXKfxg8l/PQkZhZtXMXPElpsYptIUI	patient	\N	Selic	\N	\N	\N	\N	0	f	\N	\N
29	2021-02-06 17:48:02.19	2021-02-06 17:48:02.19	sss@gmail.com	$argon2i$v=19$m=4096,t=3,p=1$S1qf2OIPAFYNQtju1ku4wQ$obN7xvkUEllneF5PTj4BbPtsrHfTSUffCh70NJZtZA8	patient	\N	Selic	\N	\N	\N	\N	0	f	\N	\N
30	2021-02-06 17:49:08.747	2021-02-06 17:49:08.747	sssf@gmail.com	$argon2i$v=19$m=4096,t=3,p=1$I7Hkv4Y99qk+sPLChzqqgQ$eSs7CGSbqkpe9dKkuCsxltO+IL9jg4frDSGbBo1PsDA	patient	\N	Selic	\N	\N	\N	\N	0	f	\N	\N
31	2021-02-06 17:51:11.698	2021-02-06 17:51:11.699	fhfhfh@gmail.com	$argon2i$v=19$m=4096,t=3,p=1$KFeIiVwZ3PVyUh4d1BRAHw$dH5OMRN2+ZMZO4GYkL1xHmpNUFV8xp4/haktqyjkwJY	patient	\N	Selic	\N	\N	\N	\N	0	f	\N	\N
32	2021-02-06 17:53:09.126	2021-02-06 17:53:09.126	nsnsn@protonmail.com	$argon2i$v=19$m=4096,t=3,p=1$jBzI3I53rGLkc7aPfFqJJg$CUgmq+TqXmjlgOJzYa5pHo5lgLGTLU/KO0RGA/LMebw	patient	\N	Selic	\N	\N	\N	\N	0	f	\N	\N
33	2021-02-06 17:54:22.791	2021-02-06 17:54:22.791	jkjkj@gmail.com	$argon2i$v=19$m=4096,t=3,p=1$xHJNrEQ0BX39afFBXgYxqw$N+FBla/+F91vBvJf8YH2zvW+H5FcQXmieY3Tru8dBAc	patient	\N	Selic	\N	\N	\N	\N	0	f	\N	\N
34	2021-02-06 17:55:34.338	2021-02-06 17:59:13.160993	dejan@gmai.com	$argon2i$v=19$m=4096,t=3,p=1$fHcUa8ftdzUeqjf7ttFC6g$iXZV/AZqm8+6mgBle5O/1wcTFBtUIGsoLjnPSafCMdY	patient	\N	Selic	\N	\N	\N	\N	0	t	\N	\N
35	2021-02-06 17:58:14.843	2021-02-06 18:28:25.019195	uros@gmail.com	$argon2i$v=19$m=4096,t=3,p=1$WMYiMdoMLdLjlfW12uMcHw$kKKdj02RHZoT+pic5msPQYIvz4PuU330nNDKdNR8oQ0	patient	\N	Selic	\N	\N	\N	\N	0	t	\N	\N
36	2021-02-06 19:36:16.707	2021-02-06 19:36:16.707	barry85@ethereal.email	$argon2i$v=19$m=4096,t=3,p=1$9KuP5UTRMTBGvPe5O5xv+g$sTe6RfoQOm3B4Vxe3RvBU8rJmFapKecRNVI+eBPh8hE	patient	\N	Selic	\N	\N	\N	\N	0	f	\N	\N
38	2021-02-08 23:31:17.724	2021-02-08 23:31:17.724	jlazarevic.ftn@gmail.com	$argon2i$v=19$m=4096,t=3,p=1$YdaWtviBcrRVWPwxp5SB1g$u2NNUS84dTEIpS/ovmnkRlhrMtI6KtikCZkW8z5fVz0	patient	\N	\N	\N	\N	\N	\N	0	f	\N	\N
39	2021-02-08 23:37:43.936	2021-02-08 23:37:43.936	selic.work@gmail.com	$argon2i$v=19$m=4096,t=3,p=1$1Wm26AdF+L6MYqIJj8twjg$oDBaGXM0ViWIoipzrqq6P0TlK07ZiaXZIJwAcIMV/64	patient	\N	\N	\N	\N	\N	\N	0	f	\N	\N
40	2021-02-08 23:38:33.23	2021-02-08 23:38:33.23	h.work@gmail.com	$argon2i$v=19$m=4096,t=3,p=1$4JJK/5R961cQGG3J8PXByg$mjyMNE2S3zFGZLppQv8f+Oi8H7QpaZa1RMfCJk5GLrc	patient	\N	\N	\N	\N	\N	\N	0	f	\N	\N
41	2021-02-08 23:39:21.247	2021-02-08 23:39:21.247	d.work@gmail.com	$argon2i$v=19$m=4096,t=3,p=1$qP2y1fDT9KtJab3lAGP5YQ$TnFuXQ4Vo34HQXqxqIjSWbw5FQysXBONT66ca4ZKu48	patient	\N	\N	\N	\N	\N	\N	0	f	\N	\N
42	2021-02-08 23:41:38.653	2021-02-08 23:41:38.653	ds.work@gmail.com	$argon2i$v=19$m=4096,t=3,p=1$2xO5OiBRpA8sFvPHEDyW3A$XGD6iPoit1vzpkY8qrLUS2oo4o7Y5iX+xZQtSa7ZGAA	patient	Nikola	Selic	\N	\N	+381604232240	\N	0	f	2	\N
43	2021-02-08 23:42:43.237	2021-02-08 23:42:43.237	ds2.work@gmail.com	$argon2i$v=19$m=4096,t=3,p=1$u1f/RBZ9I8Le2LgZC2NgdA$NCFsIJM+8qE0+OK+0tAWSRqNrY/vPmNrrR3A7GSDsAg	patient	Nikola	Selic	\N	\N	+381604232240	\N	0	f	2	\N
44	2021-02-08 23:43:14.605	2021-02-08 23:43:14.605	dss2.work@gmail.com	$argon2i$v=19$m=4096,t=3,p=1$z8BH0VF7d1z/pOikRHZyZA$jRuv+ttEju0uzqAOQvo8bcUayGpFhdVxZWsvwHCitgE	patient	Nikola	Selic	\N	\N	+381604232240	\N	0	f	2	\N
45	2021-02-08 23:48:39.736	2021-02-08 23:48:39.736	dsds2.work@gmail.com	$argon2i$v=19$m=4096,t=3,p=1$wsAx9OC7a4e4o2lBp/R7Og$ADzdzG4n589s84Njv/HwcQ8c6MG/WJAVxEQA2U0E+ZU	patient	Nikola	Selic	\N	\N	+381604232240	\N	0	f	2	\N
46	2021-02-08 23:48:53.778	2021-02-08 23:48:53.778	dsds2.swork@gmail.com	$argon2i$v=19$m=4096,t=3,p=1$g2CitCCeeYCMcuEdI1bj/Q$Ak8cUHvys39Y/GsYm19XsLIv3rHYOGATRY00vTNdjyg	patient	Nikola	Selic	\N	\N	+381604232240	\N	0	f	2	\N
47	2021-02-08 23:49:09.956	2021-02-08 23:49:09.956	dsdds2.swork@gmail.com	$argon2i$v=19$m=4096,t=3,p=1$S136lHajGQSfYULQpRTFww$JghP4v9bShvlj0PsId0Go1oAvy9dLoW1G/8XsmoIap8	patient	Nikola	Selic	\N	\N	+381604232240	\N	0	f	2	\N
48	2021-02-08 23:49:56.874	2021-02-08 23:49:56.874	ddsdds2.swork@gmail.com	$argon2i$v=19$m=4096,t=3,p=1$U8wRiS3qyLSKDpt9XgUxzA$YfngP70RA5bz/jZqd6zW56A/+WvNTOjBfLlLkz6Yaek	patient	Nikola	Selic	\N	\N	+381604232240	\N	0	f	2	\N
49	2021-02-08 23:50:19.418	2021-02-08 23:50:19.418	seliasdfch.work@gmail.comasd	$argon2i$v=19$m=4096,t=3,p=1$k7SHiK7waucyNhVbh2BtOA$nHLt4QY9Wqz5gdIGYHvIrg7RdeGaJLhAbzUqJhLnFYE	patient	Nikola	Selic	\N	\N	+381604232240	\N	0	f	2	\N
\.


--
-- Data for Name: pharmacy; Type: TABLE DATA; Schema: public; Owner: isa_super
--

COPY public.pharmacy (id, "createdAt", "updatedAt", name, "addressId", "inventoryId", long, lat, "averageRating") FROM stdin;
6	2021-02-07 17:40:54.371521	2021-02-07 17:40:54.371521	Apoteka Obradovic	1	\N	19.82052450959194	45.24252509088933	4
5	2021-02-07 17:40:34.102476	2021-02-07 17:40:34.102476	Apoteka Jankovic	2	\N	19.843389836329816	45.24148044752855	4
7	2021-02-07 17:41:02.144188	2021-02-07 17:41:02.144188	Apoteka Feniks Lek	3	\N	19.78741833152867	45.25124288364135	4
\.


--
-- Data for Name: prescription; Type: TABLE DATA; Schema: public; Owner: isa_super
--

COPY public.prescription (id, "createdAt", "updatedAt", type, deadline, "patientId", "employeeId") FROM stdin;
\.


--
-- Data for Name: price; Type: TABLE DATA; Schema: public; Owner: isa_super
--

COPY public.price (id, "createdAt", "updatedAt", price, "from", "pharmacyId", "medicineId") FROM stdin;
\.


--
-- Data for Name: rating; Type: TABLE DATA; Schema: public; Owner: isa_super
--

COPY public.rating (id, "createdAt", "updatedAt", complain, "patientId", "employeeId", "pharmacyId") FROM stdin;
\.


--
-- Data for Name: reservation; Type: TABLE DATA; Schema: public; Owner: isa_super
--

COPY public.reservation (id, "createdAt", "updatedAt", deadline, "pickupDate", "isBought", "totalSum", "pharmacyId", "patientId") FROM stdin;
\.


--
-- Data for Name: tier; Type: TABLE DATA; Schema: public; Owner: isa_super
--

COPY public.tier (id, "createdAt", "updatedAt", name, discount, "scoreMin", "scoreMax") FROM stdin;
1	2021-02-09 00:11:58.480675	2021-02-09 00:11:58.480675	Regular	0	0	10
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: isa_super
--

COPY public."user" (id, "createdAt", "updatedAt", email, password, role, "firstName", "lastName", gender, "dateOfBirth", telephone, "addressId") FROM stdin;
\.


--
-- Data for Name: working_hours; Type: TABLE DATA; Schema: public; Owner: isa_super
--

COPY public.working_hours (id, "createdAt", "updatedAt", "pharmacyID", "from", until, "employeeId") FROM stdin;
\.


--
-- Name: address_id_seq; Type: SEQUENCE SET; Schema: public; Owner: isa_super
--

SELECT pg_catalog.setval('public.address_id_seq', 3, true);


--
-- Name: appointment_definition_id_seq; Type: SEQUENCE SET; Schema: public; Owner: isa_super
--

SELECT pg_catalog.setval('public.appointment_definition_id_seq', 1, false);


--
-- Name: appointment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: isa_super
--

SELECT pg_catalog.setval('public.appointment_id_seq', 5, true);


--
-- Name: complaint_id_seq; Type: SEQUENCE SET; Schema: public; Owner: isa_super
--

SELECT pg_catalog.setval('public.complaint_id_seq', 1, false);


--
-- Name: e_prescription_id_seq; Type: SEQUENCE SET; Schema: public; Owner: isa_super
--

SELECT pg_catalog.setval('public.e_prescription_id_seq', 4, true);


--
-- Name: employee_id_seq; Type: SEQUENCE SET; Schema: public; Owner: isa_super
--

SELECT pg_catalog.setval('public.employee_id_seq', 6, true);


--
-- Name: holiday_id_seq; Type: SEQUENCE SET; Schema: public; Owner: isa_super
--

SELECT pg_catalog.setval('public.holiday_id_seq', 1, false);


--
-- Name: inventory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: isa_super
--

SELECT pg_catalog.setval('public.inventory_id_seq', 1, false);


--
-- Name: medicine_id_seq; Type: SEQUENCE SET; Schema: public; Owner: isa_super
--

SELECT pg_catalog.setval('public.medicine_id_seq', 6, true);


--
-- Name: medicine_item_id_seq; Type: SEQUENCE SET; Schema: public; Owner: isa_super
--

SELECT pg_catalog.setval('public.medicine_item_id_seq', 1, true);


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

SELECT pg_catalog.setval('public.patient_id_seq', 55, true);


--
-- Name: pharmacy_id_seq; Type: SEQUENCE SET; Schema: public; Owner: isa_super
--

SELECT pg_catalog.setval('public.pharmacy_id_seq', 7, true);


--
-- Name: prescription_id_seq; Type: SEQUENCE SET; Schema: public; Owner: isa_super
--

SELECT pg_catalog.setval('public.prescription_id_seq', 1, true);


--
-- Name: price_id_seq; Type: SEQUENCE SET; Schema: public; Owner: isa_super
--

SELECT pg_catalog.setval('public.price_id_seq', 1, false);


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

SELECT pg_catalog.setval('public.tier_id_seq', 1, true);


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
-- Name: medicine UQ_a7bbdd1d9a1f8995d52c35ae1a3; Type: CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.medicine
    ADD CONSTRAINT "UQ_a7bbdd1d9a1f8995d52c35ae1a3" UNIQUE (code);


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
-- Name: price FK_19a731694d01a3ebe920b391c39; Type: FK CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.price
    ADD CONSTRAINT "FK_19a731694d01a3ebe920b391c39" FOREIGN KEY ("medicineId") REFERENCES public.medicine(id);


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
-- Name: e_prescription FK_44b7753160b7715851206a1e8cc; Type: FK CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.e_prescription
    ADD CONSTRAINT "FK_44b7753160b7715851206a1e8cc" FOREIGN KEY ("employeeId") REFERENCES public.employee(id);


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
-- Name: medicine_item FK_77ec666365e6f37989d7407f215; Type: FK CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.medicine_item
    ADD CONSTRAINT "FK_77ec666365e6f37989d7407f215" FOREIGN KEY ("listId") REFERENCES public.medicine_list(id);


--
-- Name: holiday FK_80938de963a23c4ae243d96e5d9; Type: FK CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.holiday
    ADD CONSTRAINT "FK_80938de963a23c4ae243d96e5d9" FOREIGN KEY ("employeeId") REFERENCES public.employee(id);


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

