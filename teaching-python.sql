PGDMP     $        	            }        
   allLessons    15.4    15.4     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16408 
   allLessons    DATABASE     ~   CREATE DATABASE "allLessons" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Greek_Greece.1252';
    DROP DATABASE "allLessons";
                postgres    false            �            1259    16409    lessons    TABLE     �   CREATE TABLE public.lessons (
    id integer NOT NULL,
    name text,
    lesson_id integer,
    module_id integer,
    lesson_file text
);
    DROP TABLE public.lessons;
       public         heap    postgres    false            �            1259    16414    lessons_id_seq    SEQUENCE     �   CREATE SEQUENCE public.lessons_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.lessons_id_seq;
       public          postgres    false    214            �           0    0    lessons_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.lessons_id_seq OWNED BY public.lessons.id;
          public          postgres    false    215            e           2604    16415 
   lessons id    DEFAULT     h   ALTER TABLE ONLY public.lessons ALTER COLUMN id SET DEFAULT nextval('public.lessons_id_seq'::regclass);
 9   ALTER TABLE public.lessons ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    214            �          0    16409    lessons 
   TABLE DATA           N   COPY public.lessons (id, name, lesson_id, module_id, lesson_file) FROM stdin;
    public          postgres    false    214   �
       �           0    0    lessons_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.lessons_id_seq', 1, true);
          public          postgres    false    215            g           2606    16417    lessons lessons_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.lessons
    ADD CONSTRAINT lessons_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.lessons DROP CONSTRAINT lessons_pkey;
       public            postgres    false    214            �     x����n�0ǯ�Sx�o��	e��P�U��ݮ&!CxM��6�x�>Ti��$t)�M ���η��q'�=|bߤ�`k���{����(���,{s��Ӹ.6#��Uz���;ɔ���V�3���h��yk�ŘR
���p.�[8-T�(J���0��)�%1����Vxc���=�,{R�p�l����:K{	��N[�a�X��B.�`� ,L;�h9i-�m�XSC��w��:V���@��5e��M-��}��>x�b�(vl
�.���8���Bo�b+�r}��*%e�)�$@uJ�Z�f�it�#�^_8������ɿrLG�,���`�����9!��X舩h�T%Y��D�1�0�j��&|j� 7��9t,``=ޞ�evR'���l#H���%�<�	�]i),��X�wU����\b��(Y4ϰ(-+�����tx8E��i�CKF��8{a�/���a��>B��,��~V����%R�f��BUF�3�CP9���~��hN"�t;#���nL�����_�Q�0c��7�P�U�!;6��ŝv#;-�s8y4�C�h�|&u7�w�$�^KУE�X�Ȋ�t���L�l+*��x|��%�Ĺ���`8���N��v\� x>������ٱ��I��k�L	���L9,>RҘ�It:��<[�j�w4��d�,�m8���ch��,!��y�duP�5Ajv��u��0+H��S9Q���l��6�8�!c����Q�\���WÈ.�kb]�N���y�&Ě�cQj?��h�@��'     