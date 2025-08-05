--
-- PostgreSQL database dump
--

-- Dumped from database version 14.18 (Ubuntu 14.18-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.18 (Ubuntu 14.18-0ubuntu0.22.04.1)

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: notes; Type: TABLE; Schema: public; Owner: dev
--

CREATE TABLE public.notes (
    note_id integer NOT NULL,
    title character varying(255),
    body text,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    pinned boolean DEFAULT false,
    user_id integer
);


ALTER TABLE public.notes OWNER TO dev;

--
-- Name: notes_note_id_seq; Type: SEQUENCE; Schema: public; Owner: dev
--

CREATE SEQUENCE public.notes_note_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.notes_note_id_seq OWNER TO dev;

--
-- Name: notes_note_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dev
--

ALTER SEQUENCE public.notes_note_id_seq OWNED BY public.notes.note_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: dev
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    email character varying(255) NOT NULL,
    password_hash character varying(255) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.users OWNER TO dev;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: dev
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_user_id_seq OWNER TO dev;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dev
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: notes note_id; Type: DEFAULT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.notes ALTER COLUMN note_id SET DEFAULT nextval('public.notes_note_id_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Data for Name: notes; Type: TABLE DATA; Schema: public; Owner: dev
--

COPY public.notes (note_id, title, body, created_at, pinned, user_id) FROM stdin;
2	Thoughts on Gemini	Yea honestly at first glance this is pretty clean. React Tailwind Node Express PostgreSQL application with not the ugliest UI. But I'll check if the backend works well. I'm honestly very impressed.	2025-08-04 14:00:21.941873-05	t	1
9	Search function	didnt even realize it was there LMAOOOO. ts is crazy. it works well too	2025-08-04 14:39:24.175335-05	f	1
5	Masonry	wow the masonry makes it look real nice. the edit and delete buttons are still spaced not perfect but to be honest the fact that it edits clean is great	2025-08-04 14:16:45.843033-05	f	1
4	Forgot to Mention	forgot to mention that gemini also created a test note LMAO. this is awsome	2025-08-04 14:05:22.833177-05	f	1
1	Test Note	This is a test note.	2025-08-04 14:00:07.301265-05	f	1
6	Pinning and Dark Mode	yea this shit is clean. its not gonna automaticlaly choose to highlight the pinned note unless i specify, which is fine. haven't looked into backend db yet. man i am not getting a job holy	2025-08-04 14:25:35.609196-05	f	1
7	UI/UX	base ui/ux seems fine tbh. not much temperature. the ui/ux changes definitely seem to take more time than general functional implementation	2025-08-04 14:35:57.528667-05	f	1
3	New Thoughts	okay so it didnt work first try but it was a timing thing lol. like the table was missing when the application first started and the backend process finished after? wild. but it works so far i can create and delete and read ig. This was incredibly fast and only like a tenth of the daily tokens or smth.\n\n\n	2025-08-04 14:04:45.823184-05	f	1
10	Auth	yo this shit is insane i cant lie so there was a complicated issue where it implemented user authentication, adding a user_id column to the notes table to link each note to a specific user. howerver the notes that already existed had a NULL value for user_id, and it literally was like yea we can just search for all NULL user_id's and assign those to whoever you want whats ur email. like holy shit and it just worked\n	2025-08-04 14:53:40.933572-05	f	1
12	First note	september first labor day afternoon game with angels i need to let them know early otherwise itll be gone	2025-08-04 15:00:41.835754-05	f	2
8	New UI/UX	looks good. there was a pin persistence issue but i think it should be fixed now too. yup it was fixed. WOAH	2025-08-04 14:36:50.001953-05	f	1
13	Leaderboard	bro theres a leaderboard now too. i think i have to be careful just fully vibecoding i really would liek to learn. maybe provide context that i want it to explain stuff and then i can look thru code each time to manually lengthen the process. eventually wanna use this to create powerlifting website\n	2025-08-04 15:10:35.849792-05	f	1
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: dev
--

COPY public.users (user_id, email, password_hash, created_at) FROM stdin;
1	danielbaowen@gmail.com	$2b$10$5Nsf0Rp8XWZsIta2YhdeBeVgdp8wnv43FghgaK0ZsnjlnCPU6gPry	2025-08-04 14:49:33.234022-05
2	shu_weijing@yahoo.com	$2b$10$7uQ5F5p2DBoG3kzh3K6G9euFFD0cm2E.ygdoy1zcRSptpqnsbVFnm	2025-08-04 15:00:16.867842-05
\.


--
-- Name: notes_note_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dev
--

SELECT pg_catalog.setval('public.notes_note_id_seq', 13, true);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dev
--

SELECT pg_catalog.setval('public.users_user_id_seq', 2, true);


--
-- Name: notes notes_pkey; Type: CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.notes
    ADD CONSTRAINT notes_pkey PRIMARY KEY (note_id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: notes notes_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.notes
    ADD CONSTRAINT notes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- PostgreSQL database dump complete
--

