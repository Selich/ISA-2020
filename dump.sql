--
-- PostgreSQL database dump
--

-- Dumped from database version 12.7 (Ubuntu 12.7-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.7 (Ubuntu 12.7-0ubuntu0.20.04.1)

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
    lat character varying,
    long character varying,
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
    "isVisited" boolean DEFAULT false,
    begin timestamp without time zone,
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
-- Name: holiday; Type: TABLE; Schema: public; Owner: isa_super
--

CREATE TABLE public.holiday (
    id integer NOT NULL,
    version integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "from" date,
    until date,
    "isApproved" boolean,
    comments character varying,
    "pharmacyId" integer,
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
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    type character varying,
    deadline timestamp without time zone,
    "patientId" integer,
    "employeeId" integer
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
-- Name: patient_alergies; Type: TABLE; Schema: public; Owner: isa_super
--

CREATE TABLE public.patient_alergies (
    "patientId" integer NOT NULL,
    "medicineId" integer NOT NULL
);


ALTER TABLE public.patient_alergies OWNER TO isa_super;

--
-- Name: pharmacy; Type: TABLE; Schema: public; Owner: isa_super
--

CREATE TABLE public.pharmacy (
    id integer NOT NULL,
    version integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    name character varying,
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
-- Name: price; Type: TABLE; Schema: public; Owner: isa_super
--

CREATE TABLE public.price (
    id integer NOT NULL,
    version integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    price integer,
    "from" character varying,
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
    deadline date,
    "pickupDate" character varying,
    code character varying,
    "originalId" integer,
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
    name character varying,
    discount integer,
    "scoreMin" integer,
    "scoreMax" integer
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
    "isEnabled" boolean DEFAULT false NOT NULL,
    email character varying,
    password character varying,
    role public.user_role_enum,
    "firstName" character varying,
    "lastName" character varying,
    telephone character varying,
    score integer DEFAULT 0,
    penalty integer DEFAULT 0,
    "averageRating" integer DEFAULT 0,
    type character varying NOT NULL,
    "addressId" integer,
    "tierId" integer,
    "pharmacyId" integer
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
-- Name: user_subscriptions_pharmacy; Type: TABLE; Schema: public; Owner: isa_super
--

CREATE TABLE public.user_subscriptions_pharmacy (
    "userId" integer NOT NULL,
    "pharmacyId" integer NOT NULL
);


ALTER TABLE public.user_subscriptions_pharmacy OWNER TO isa_super;

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
-- Name: holiday id; Type: DEFAULT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.holiday ALTER COLUMN id SET DEFAULT nextval('public.holiday_id_seq'::regclass);


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
-- Name: pharmacy id; Type: DEFAULT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.pharmacy ALTER COLUMN id SET DEFAULT nextval('public.pharmacy_id_seq'::regclass);


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

COPY public.address (id, version, "createdAt", "updatedAt", lat, long, street, city, country) FROM stdin;
1	1	2021-06-06 12:00:04.711191	2021-06-06 12:00:04.711191	\N	\N	Bulevar despota Stefana	Novi Sad	Serbia
2	2	2021-06-06 12:18:29.018	2021-06-06 12:18:29.069143	45.23569699999999	19.838705	Bulevar despota Stefana 7a	Novi Sad	Serbia
3	1	2021-06-06 13:22:22.411	2021-06-06 13:22:22.411	\N	\N	Bulevar despota Stefana 9	Novi Sad	Serbia
\.


--
-- Data for Name: appointment; Type: TABLE DATA; Schema: public; Owner: isa_super
--

COPY public.appointment (id, version, "createdAt", "updatedAt", kind, score, price, discount, report, "isVisited", begin, length, "patientId", "employeeId", "pharmacyId", "prescriptionId") FROM stdin;
7	2	2021-06-06 16:21:03.516	2021-06-06 16:21:03.566749	pharm	8	8	\N	\N	f	2021-07-01 14:00:00	30	4	8	2	\N
\.


--
-- Data for Name: appointment_definition; Type: TABLE DATA; Schema: public; Owner: isa_super
--

COPY public.appointment_definition (id, version, "createdAt", "updatedAt", kind, score, price, "pharmacyId") FROM stdin;
4	1	2021-06-06 15:26:50.544	2021-06-06 15:26:50.544	pharm	8	8	2
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
-- Data for Name: holiday; Type: TABLE DATA; Schema: public; Owner: isa_super
--

COPY public.holiday (id, version, "createdAt", "updatedAt", "from", until, "isApproved", comments, "pharmacyId", "employeeId") FROM stdin;
1	1	2021-06-06 12:13:41.599	2021-06-06 12:13:41.599	2021-07-01	2021-07-02	f	\N	\N	3
\.


--
-- Data for Name: medicine; Type: TABLE DATA; Schema: public; Owner: isa_super
--

COPY public.medicine (id, version, "createdAt", "updatedAt", code, name, kind, points, form, contents, producer, rating, "isPrescriptionRequired", info) FROM stdin;
1	1	2021-06-06 13:52:21.303	2021-06-06 13:52:21.303	1	Aspirin	Tablet	3	Tablet	Each tablet contains Aspirin 325 mg Aspirin (Acetysalicylic Acid) 325 mg (5gr.) (NSAID)*	\N	3	f	Aspirin, also known as acetylsalicylic acid, is a medication used to reduce pain, fever, or inflammation. 
\.


--
-- Data for Name: medicine_item; Type: TABLE DATA; Schema: public; Owner: isa_super
--

COPY public.medicine_item (id, version, "createdAt", "updatedAt", quantity, "currentPrice", "dateOfPurchase", instructions, "detailsId", "listId") FROM stdin;
3	1	2021-06-06 19:11:04.031	2021-06-06 19:11:04.031	20	\N	\N	\N	1	1
\.


--
-- Data for Name: medicine_list; Type: TABLE DATA; Schema: public; Owner: isa_super
--

COPY public.medicine_list (id, version, "createdAt", "updatedAt", type, deadline, "patientId", "employeeId") FROM stdin;
1	1	2021-06-06 13:22:22.447	2021-06-06 13:22:22.447	Inventory	\N	\N	\N
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
-- Data for Name: patient_alergies; Type: TABLE DATA; Schema: public; Owner: isa_super
--

COPY public.patient_alergies ("patientId", "medicineId") FROM stdin;
\.


--
-- Data for Name: pharmacy; Type: TABLE DATA; Schema: public; Owner: isa_super
--

COPY public.pharmacy (id, version, "createdAt", "updatedAt", name, "averageRating", "addressId", "inventoryId") FROM stdin;
2	1	2021-06-06 13:22:22.378	2021-06-06 13:22:22.378	Pharm 	3	3	1
\.


--
-- Data for Name: price; Type: TABLE DATA; Schema: public; Owner: isa_super
--

COPY public.price (id, version, "createdAt", "updatedAt", price, "from", "pharmacyId", "medicineId") FROM stdin;
\.


--
-- Data for Name: rating; Type: TABLE DATA; Schema: public; Owner: isa_super
--

COPY public.rating (id, version, "createdAt", "updatedAt", rating, "patientId", "employeeId", "pharmacyId", "medicineId") FROM stdin;
\.


--
-- Data for Name: reservation; Type: TABLE DATA; Schema: public; Owner: isa_super
--

COPY public.reservation (id, version, "createdAt", "updatedAt", deadline, "pickupDate", code, "originalId", "isBought", "totalSum", "pharmacyId", "patientId", "medicineItemId") FROM stdin;
\.


--
-- Data for Name: tier; Type: TABLE DATA; Schema: public; Owner: isa_super
--

COPY public.tier (id, version, "createdAt", "updatedAt", name, discount, "scoreMin", "scoreMax") FROM stdin;
4	1	2021-06-06 11:56:23.85	2021-06-06 11:56:23.85	Regular	0	0	14
5	1	2021-06-06 11:56:23.86	2021-06-06 11:56:23.86	Silver	20	15	29
6	1	2021-06-06 11:56:23.866	2021-06-06 11:56:23.866	Gold	30	30	999
8	1	2021-06-06 15:42:14.23	2021-06-06 15:42:14.23	Platinum	50	50	100
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: isa_super
--

COPY public."user" (id, version, "createdAt", "updatedAt", "isEnabled", email, password, role, "firstName", "lastName", telephone, score, penalty, "averageRating", type, "addressId", "tierId", "pharmacyId") FROM stdin;
2	1	2021-06-06 11:56:23.793	2021-06-06 11:56:23.793	f	sys@gmail.com	\N	sysadmin	Admin	Admin	\N	0	0	0	Employee	2	\N	\N
3	1	2021-06-06 12:06:22.55	2021-06-06 12:06:22.55	f	derm@gmail.com	$2b$10$lrHe7vdknI5.a4xJiV979eN.sk.KLTN20S9ymr3OE/n.iBoCaXhfe	derm	Nikola	Selic	+381604232240	0	0	3	Employee	2	\N	\N
5	1	2021-06-06 12:28:20.346	2021-06-06 12:28:20.346	f	admin@gmail.com	$2b$10$oD7rjf/soz3ki/rMgKZ28ei0PD.R7c2HYqF2SA35S8w6oq3dwscCO	derm	Nikola	Selic	+381604232240	0	0	3	Employee	2	\N	\N
7	2	2021-06-06 12:30:09.327	2021-06-06 13:38:49.776715	f	p@gmail.com	$2b$10$SE9ucHUWpYUl5AKrDUPqNuF/mpDknsRjhqnqQso1T7IAtLhitqsTa	admin	Nikola	Selic	+381604232240	0	0	3	Employee	2	\N	2
11	2	2021-06-06 14:42:30.799	2021-06-06 14:42:46.834357	f	selich.admin@gmail.com	$2b$10$bIBKLZjSMrDIwjFPfikbR.wuq1fRl0g1QWSKBNs8YhAOAkJ3kiY6u	admin	Nikola	Selic	+381604232240	0	0	3	Employee	\N	\N	2
8	1	2021-06-06 14:34:44.805	2021-06-06 14:34:44.805	f	pharm1@gmail.com	$2b$10$NPIT1vKDNkxETDLupKRE5OATIUDdSlpZx72fAup7lBAbYmnyJiqTG	pharm	Nikola	Selic	+381604232240	0	0	3	Employee	2	\N	2
4	8	2021-06-06 12:18:27.288	2021-06-06 16:21:03.566749	t	selich.work@gmail.com	$argon2i$v=19$m=4096,t=3,p=1$PIfBpEsAzF5hX57YF5G63A$/zZqyB9JL2Bm2UxisxZmgmIgOQn6ZgwfU+a5w6Mu44g	patient	Nikola	Selic	+381604232240	0	0	0	Patient	2	4	\N
\.


--
-- Data for Name: user_subscriptions_pharmacy; Type: TABLE DATA; Schema: public; Owner: isa_super
--

COPY public.user_subscriptions_pharmacy ("userId", "pharmacyId") FROM stdin;
\.


--
-- Data for Name: working_hours; Type: TABLE DATA; Schema: public; Owner: isa_super
--

COPY public.working_hours (id, version, "createdAt", "updatedAt", "from", until, "employeeId", "pharmacyId") FROM stdin;
1	1	2021-06-06 14:22:41.896	2021-06-06 14:22:41.896	08:00:00	14:00:00	5	2
2	1	2021-06-06 14:48:01.949	2021-06-06 14:48:01.949	08:00:00	15:00:00	8	2
\.


--
-- Name: address_id_seq; Type: SEQUENCE SET; Schema: public; Owner: isa_super
--

SELECT pg_catalog.setval('public.address_id_seq', 3, true);


--
-- Name: appointment_definition_id_seq; Type: SEQUENCE SET; Schema: public; Owner: isa_super
--

SELECT pg_catalog.setval('public.appointment_definition_id_seq', 4, true);


--
-- Name: appointment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: isa_super
--

SELECT pg_catalog.setval('public.appointment_id_seq', 7, true);


--
-- Name: complaint_id_seq; Type: SEQUENCE SET; Schema: public; Owner: isa_super
--

SELECT pg_catalog.setval('public.complaint_id_seq', 1, false);


--
-- Name: e_prescription_id_seq; Type: SEQUENCE SET; Schema: public; Owner: isa_super
--

SELECT pg_catalog.setval('public.e_prescription_id_seq', 1, false);


--
-- Name: holiday_id_seq; Type: SEQUENCE SET; Schema: public; Owner: isa_super
--

SELECT pg_catalog.setval('public.holiday_id_seq', 1, true);


--
-- Name: medicine_id_seq; Type: SEQUENCE SET; Schema: public; Owner: isa_super
--

SELECT pg_catalog.setval('public.medicine_id_seq', 1, true);


--
-- Name: medicine_item_id_seq; Type: SEQUENCE SET; Schema: public; Owner: isa_super
--

SELECT pg_catalog.setval('public.medicine_item_id_seq', 3, true);


--
-- Name: medicine_list_id_seq; Type: SEQUENCE SET; Schema: public; Owner: isa_super
--

SELECT pg_catalog.setval('public.medicine_list_id_seq', 1, true);


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
-- Name: pharmacy_id_seq; Type: SEQUENCE SET; Schema: public; Owner: isa_super
--

SELECT pg_catalog.setval('public.pharmacy_id_seq', 2, true);


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

SELECT pg_catalog.setval('public.tier_id_seq', 8, true);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: isa_super
--

SELECT pg_catalog.setval('public.user_id_seq', 11, true);


--
-- Name: working_hours_id_seq; Type: SEQUENCE SET; Schema: public; Owner: isa_super
--

SELECT pg_catalog.setval('public.working_hours_id_seq', 2, true);


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
-- Name: user_subscriptions_pharmacy PK_69b3397c0b4b8fd6feddd75828d; Type: CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.user_subscriptions_pharmacy
    ADD CONSTRAINT "PK_69b3397c0b4b8fd6feddd75828d" PRIMARY KEY ("userId", "pharmacyId");


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
-- Name: patient_alergies PK_fd206a856112b6d2ad65acb0fec; Type: CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.patient_alergies
    ADD CONSTRAINT "PK_fd206a856112b6d2ad65acb0fec" PRIMARY KEY ("patientId", "medicineId");


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
-- Name: IDX_1f0cf5c26f033a6f9e1518599b; Type: INDEX; Schema: public; Owner: isa_super
--

CREATE INDEX "IDX_1f0cf5c26f033a6f9e1518599b" ON public.user_subscriptions_pharmacy USING btree ("pharmacyId");


--
-- Name: IDX_244f5181fe2d9d0fbd161bd8a2; Type: INDEX; Schema: public; Owner: isa_super
--

CREATE INDEX "IDX_244f5181fe2d9d0fbd161bd8a2" ON public.user_subscriptions_pharmacy USING btree ("userId");


--
-- Name: IDX_31ef2b4d30675d0c15056b7f6e; Type: INDEX; Schema: public; Owner: isa_super
--

CREATE INDEX "IDX_31ef2b4d30675d0c15056b7f6e" ON public."user" USING btree (type);


--
-- Name: IDX_628000f9e0961c9c2cd7c10ef3; Type: INDEX; Schema: public; Owner: isa_super
--

CREATE INDEX "IDX_628000f9e0961c9c2cd7c10ef3" ON public.patient_alergies USING btree ("medicineId");


--
-- Name: IDX_ce19541f870862eecaf640e8b0; Type: INDEX; Schema: public; Owner: isa_super
--

CREATE INDEX "IDX_ce19541f870862eecaf640e8b0" ON public.patient_alergies USING btree ("patientId");


--
-- Name: complaint FK_02bb7b0b408ce9d0d37330b51b0; Type: FK CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.complaint
    ADD CONSTRAINT "FK_02bb7b0b408ce9d0d37330b51b0" FOREIGN KEY ("patientId") REFERENCES public."user"(id);


--
-- Name: e_prescription FK_03c5926a501324b6f36973c1506; Type: FK CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.e_prescription
    ADD CONSTRAINT "FK_03c5926a501324b6f36973c1506" FOREIGN KEY ("patientId") REFERENCES public."user"(id);


--
-- Name: complaint FK_06aff3d57e7fdd62467dc318657; Type: FK CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.complaint
    ADD CONSTRAINT "FK_06aff3d57e7fdd62467dc318657" FOREIGN KEY ("employeeId") REFERENCES public."user"(id);


--
-- Name: reservation FK_0f93ae897aff015e823b323098d; Type: FK CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.reservation
    ADD CONSTRAINT "FK_0f93ae897aff015e823b323098d" FOREIGN KEY ("pharmacyId") REFERENCES public.pharmacy(id);


--
-- Name: pharmacy FK_10d5831c66f8a1a46826dbd4088; Type: FK CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.pharmacy
    ADD CONSTRAINT "FK_10d5831c66f8a1a46826dbd4088" FOREIGN KEY ("inventoryId") REFERENCES public.medicine_list(id);


--
-- Name: price FK_19a731694d01a3ebe920b391c39; Type: FK CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.price
    ADD CONSTRAINT "FK_19a731694d01a3ebe920b391c39" FOREIGN KEY ("medicineId") REFERENCES public.medicine_item(id);


--
-- Name: user_subscriptions_pharmacy FK_1f0cf5c26f033a6f9e1518599b0; Type: FK CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.user_subscriptions_pharmacy
    ADD CONSTRAINT "FK_1f0cf5c26f033a6f9e1518599b0" FOREIGN KEY ("pharmacyId") REFERENCES public.pharmacy(id) ON DELETE CASCADE;


--
-- Name: user FK_217ba147c5de6c107f2fa7fa271; Type: FK CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "FK_217ba147c5de6c107f2fa7fa271" FOREIGN KEY ("addressId") REFERENCES public.address(id);


--
-- Name: user_subscriptions_pharmacy FK_244f5181fe2d9d0fbd161bd8a23; Type: FK CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.user_subscriptions_pharmacy
    ADD CONSTRAINT "FK_244f5181fe2d9d0fbd161bd8a23" FOREIGN KEY ("userId") REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- Name: appointment FK_395df0ff38bf6a9b65c52ad80ce; Type: FK CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.appointment
    ADD CONSTRAINT "FK_395df0ff38bf6a9b65c52ad80ce" FOREIGN KEY ("pharmacyId") REFERENCES public.pharmacy(id);


--
-- Name: appointment FK_42491e9c6a079301ffdf905e308; Type: FK CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.appointment
    ADD CONSTRAINT "FK_42491e9c6a079301ffdf905e308" FOREIGN KEY ("prescriptionId") REFERENCES public.medicine_list(id);


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
-- Name: medicine_list FK_58fc3afdfdd76114839c8a3d558; Type: FK CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.medicine_list
    ADD CONSTRAINT "FK_58fc3afdfdd76114839c8a3d558" FOREIGN KEY ("employeeId") REFERENCES public."user"(id);


--
-- Name: appointment FK_5ce4c3130796367c93cd817948e; Type: FK CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.appointment
    ADD CONSTRAINT "FK_5ce4c3130796367c93cd817948e" FOREIGN KEY ("patientId") REFERENCES public."user"(id);


--
-- Name: medicine_request FK_5d357dc991004241023bdcbba60; Type: FK CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.medicine_request
    ADD CONSTRAINT "FK_5d357dc991004241023bdcbba60" FOREIGN KEY ("medicineId") REFERENCES public.medicine(id);


--
-- Name: patient_alergies FK_628000f9e0961c9c2cd7c10ef35; Type: FK CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.patient_alergies
    ADD CONSTRAINT "FK_628000f9e0961c9c2cd7c10ef35" FOREIGN KEY ("medicineId") REFERENCES public.medicine(id) ON DELETE CASCADE;


--
-- Name: reservation FK_67b21a33ec4df116ffa9921d616; Type: FK CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.reservation
    ADD CONSTRAINT "FK_67b21a33ec4df116ffa9921d616" FOREIGN KEY ("patientId") REFERENCES public."user"(id);


--
-- Name: medicine_request FK_67dc17248e359931205abe5fd26; Type: FK CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.medicine_request
    ADD CONSTRAINT "FK_67dc17248e359931205abe5fd26" FOREIGN KEY ("employeeId") REFERENCES public."user"(id);


--
-- Name: rating FK_6e38dd76bbc6d24e6d03dc97655; Type: FK CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.rating
    ADD CONSTRAINT "FK_6e38dd76bbc6d24e6d03dc97655" FOREIGN KEY ("patientId") REFERENCES public."user"(id);


--
-- Name: rating FK_76656cd9f8aada4971cdf12e1a8; Type: FK CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.rating
    ADD CONSTRAINT "FK_76656cd9f8aada4971cdf12e1a8" FOREIGN KEY ("medicineId") REFERENCES public.medicine(id);


--
-- Name: medicine_item FK_77ec666365e6f37989d7407f215; Type: FK CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.medicine_item
    ADD CONSTRAINT "FK_77ec666365e6f37989d7407f215" FOREIGN KEY ("listId") REFERENCES public.medicine_list(id);


--
-- Name: e_prescription FK_78a350b64bab2fc346318d3637a; Type: FK CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.e_prescription
    ADD CONSTRAINT "FK_78a350b64bab2fc346318d3637a" FOREIGN KEY ("pharmacyId") REFERENCES public.pharmacy(id);


--
-- Name: holiday FK_80938de963a23c4ae243d96e5d9; Type: FK CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.holiday
    ADD CONSTRAINT "FK_80938de963a23c4ae243d96e5d9" FOREIGN KEY ("employeeId") REFERENCES public."user"(id);


--
-- Name: user FK_8dcf78ac4a83d7e2d36abecb8f3; Type: FK CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "FK_8dcf78ac4a83d7e2d36abecb8f3" FOREIGN KEY ("tierId") REFERENCES public.tier(id);


--
-- Name: working_hours FK_961da74fb96975fb75adc2e3f32; Type: FK CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.working_hours
    ADD CONSTRAINT "FK_961da74fb96975fb75adc2e3f32" FOREIGN KEY ("pharmacyId") REFERENCES public.pharmacy(id);


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
    ADD CONSTRAINT "FK_b6e57758a28acd843878b1f30d8" FOREIGN KEY ("employeeId") REFERENCES public."user"(id);


--
-- Name: medicine_item FK_c4219076847bc1942c7fb3685a9; Type: FK CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.medicine_item
    ADD CONSTRAINT "FK_c4219076847bc1942c7fb3685a9" FOREIGN KEY ("detailsId") REFERENCES public.medicine(id);


--
-- Name: patient_alergies FK_ce19541f870862eecaf640e8b08; Type: FK CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.patient_alergies
    ADD CONSTRAINT "FK_ce19541f870862eecaf640e8b08" FOREIGN KEY ("patientId") REFERENCES public."user"(id) ON DELETE CASCADE;


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
-- Name: medicine_list FK_e61ad5ccdcfcd79ab284a8a1702; Type: FK CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.medicine_list
    ADD CONSTRAINT "FK_e61ad5ccdcfcd79ab284a8a1702" FOREIGN KEY ("patientId") REFERENCES public."user"(id);


--
-- Name: rating FK_f2a79d76281a675b374b4b513ae; Type: FK CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.rating
    ADD CONSTRAINT "FK_f2a79d76281a675b374b4b513ae" FOREIGN KEY ("employeeId") REFERENCES public."user"(id);


--
-- Name: user FK_fb9dfc79642eed1e721929e696b; Type: FK CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "FK_fb9dfc79642eed1e721929e696b" FOREIGN KEY ("pharmacyId") REFERENCES public.pharmacy(id);


--
-- Name: working_hours FK_fcb026d00cc613c1cd388b21a30; Type: FK CONSTRAINT; Schema: public; Owner: isa_super
--

ALTER TABLE ONLY public.working_hours
    ADD CONSTRAINT "FK_fcb026d00cc613c1cd388b21a30" FOREIGN KEY ("employeeId") REFERENCES public."user"(id);


--
-- PostgreSQL database dump complete
--

