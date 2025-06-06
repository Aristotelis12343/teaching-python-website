PGDMP             
            }        
   allLessons    15.4    15.4     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                        1262    16408 
   allLessons    DATABASE     ~   CREATE DATABASE "allLessons" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Greek_Greece.1252';
    DROP DATABASE "allLessons";
                postgres    false            �            1259    16442 	   exercises    TABLE     �   CREATE TABLE public.exercises (
    id integer NOT NULL,
    lesson_id integer NOT NULL,
    module_id integer NOT NULL,
    question text NOT NULL,
    options text[] NOT NULL,
    correct_indices integer[] NOT NULL
);
    DROP TABLE public.exercises;
       public         heap    postgres    false            �            1259    16441    exercises_id_seq    SEQUENCE     �   CREATE SEQUENCE public.exercises_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.exercises_id_seq;
       public          postgres    false    217                       0    0    exercises_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.exercises_id_seq OWNED BY public.exercises.id;
          public          postgres    false    216            h           2604    16445    exercises id    DEFAULT     l   ALTER TABLE ONLY public.exercises ALTER COLUMN id SET DEFAULT nextval('public.exercises_id_seq'::regclass);
 ;   ALTER TABLE public.exercises ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    216    217            �          0    16442 	   exercises 
   TABLE DATA           a   COPY public.exercises (id, lesson_id, module_id, question, options, correct_indices) FROM stdin;
    public          postgres    false    217   '                  0    0    exercises_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.exercises_id_seq', 1, false);
          public          postgres    false    216            j           2606    16449    exercises exercises_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.exercises
    ADD CONSTRAINT exercises_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.exercises DROP CONSTRAINT exercises_pkey;
       public            postgres    false    217            �      x��\{�Gr�[�I���keI9� ����ہd��i�};�����K�;���WU����C�/��%g�������՜=��_��2k�:���6��٪�5�&S��ֵ��T�uU�G�h_��ɾ=6۪̦g��Z٬օVV����/�n8�p0��<�pz�x����	����!Î>z��o�����i�5������l���ec3���O��j�lwė7e����ɖ:���F�4���u���ng�MV�rsP�j՘�����U�i��ͪ)�4��{�2k�7U��c[��Ϭ�����cm*|�}���M�
������ϙ*����T��7<��yr��^���I�U�a�J�K��	V�_����
*XVMvYV���雃�P�:3;�1�vb�����<TS������ƞAFY�-	 �ZW,�@ckmEC$Y���@X}M!|"D�6�1�C�ήMQ Cs�EPW� %ϦX����	7  ��nY#�R->���2Y�Ty�-E���Ն�9h�
Ϫ] $[�&�M.ý<�b*�{PzUr��(�k�D�eg��ט�I�-ŎX�=A���R�3�1iB�0S���o�kB:8��I�l.>?�J`�WUq�i�lc�^]�������|[UV��ʕ�-	����qkV[�Ԟ�gm�U���NFzc���8��O�dwQ8]��b�d:�%��㦓ɳ_1��t���hHe������~�p�j���f� ��؝��);��e��5nՕVQ6����16+�����t��p���;W��a�۳�.�ҙ�*[���;��J�fc@��]�5؃��<���=�9���n_TG�u����j����Y6[�7Ȃ-l�'x&1��E�C�n�
��C�Hb�
s�;�H���@@��y�W�5YT�6�Q)�\W�%�˧�5�(�k��w:�0�"�Jt�~
0D��!$���$wID8�>��"5ǽ��t���]��+<i�p
��@����`{�]q�1`��#����o��9�->��tU�vD��J����@�;�@H`�Mi~��%��@��3���W���?rx������q� ��ė����\I�hb<�m)�R��.H�ͤP��ӊ|��%�jG8�m���֙}f���zY�o��"�h�h�({/�)�T�d�H�x�e�`=*��:�C^�ѿ�R崱��^9$�hN���$����1�aJ";��h.t�KI�w(���%����x����jڎ-����A;��nb&�Λ�*y��H�
a>�K:��H�Nz֘եn`�_�~=��/���Wա6��6�%�U��-��w��N�<�q�y}�гݾ���@��19lRpWhJ�q��y�p�Cǆ�5Zyg��A�+���D�V�3��R��P(V@Y����-D6+XX`�������C�ƃ��Q$R�~;��9��^'�<���XZw-��$�D4��nM�M�:����{n��^��Ru�t�N0���:ÝTn[���Zm�`H�[� hHn�PGY9뮢�Bk{�T�%�<��ٖ��j�Ks�S ���J4M��;|��MϽ)�X���)��E�]2��h��>�٠�T`��W�2,��D�D4�X���l�!c�Х�X���шtda���0���B��,�A�ֳ~z�?_�YE0��=
�� ���3,��(`�D���}�a��#��%ޒ�Y��$�dv��n�'�u8�Ǐ?�C�s[#����,D������,A�yw��'xn�8���af�P�)EC2e\�l�����`�`��>y>ᙒ�C�R����޷v��]���	��tq�>��]?*��=�5~��>���#3*��l���If�#��%�A"��7UUt�I�NKP�H^�!����|�×q���sT�t���/؟L��X��X�%�X�(1-GF\�]*$"+��5�ZS܃��/�kO�M��R;�{�Sq���*C�a��ڟ�h=y3��ϥ�i9!>l�F���a8�)���_I&WUsʬ����t*ˣ��>K��)��W\tv���p��YbZQM�S ���J �o]G�ѡĞ1Wd�u���a�yr=;Ǯf�pN��������
A\�w�ɵu�љ����pz"�#4������*R���/�5���F���!O��a)�'Y��'ҋ����/'���:k�y�E0$(�s��k�_��;�t~�����vc��rU��-�F7gl]����LH�!�FG�%a/[�}���(�<A���dd%��#��5�-m�}e��]2�#ZG1T�2T;cZ�Q����NQ�)�"r1<?��*FO���n�Dί�|�Q̝z����ܜ���ϲf��ϱUf��@z�̹šRB�w᩾ك�\�*����I�r���F�\$�H�!ugA��q6g�q6?;;q-�g�pdƘ�������Kw�:��۩P��lys�(0%��C��d8u�ʚ���R��Lf-�)������^ 钣��
2�T�Rɲ(��6�/�=�4��b�#S�SbT*�p���	`�Q�"\,�1R-���j��%m[��fE99&�R�fuA��4��>)1"�{Ē|���:�rJ�=�6Ő.�������w��7RN�i��݇���y���"ަ�#�p�Y �����Ԅ�2W�{x�F����X�*Y�G��m��Ȁ���Z���js�������򩃂�-������90����2SW�ji
�i�E�����5-�v�[�>O���9��<��a�L�����)����� !�a�B�!�2���cfK}�jn����,�Z9�8�y��1�5�������n���C�(��rL
�,��&���FK�Ľ��]lDV���r�����ݐl&2�T��5���-�gz�����d�?�A�\,Y��S�^
�Z��ZQ=��d{&Ǣ>��gB���N
�j�+ة1��k9�ysƮ��� ��l�a�n� �X�� �T$���ţE�T$Ջ>
�Be򣖘�z�؞o[�j������k���l�����t)k>��QD�3�LbjZ�e�2r��d�P���j==�L����������.�Bi1�b�#��qn��U�1�IPD1���kSۆ�ʶ�e���[*�|��.	K<)�̳;�g����H #^l�BA���ل��y�f�c�v��)��� �o!Z%����9�C�U���f�����O�8����=4�c6�������������� ���� :�bR̆�NCK�lz'CbOHY%�~���r��O�ji*7��=B<1oy�/�e��`�@�:;w�'��?��OCV-TYi�g^�y�2d�e	nGޟͺ��#0Y���e�Kv�
�2�-j/G���٣E�cjB�MK�_b;VA�kUn���A�(N,��q'B��.J�c��(^��8z��?i� ���3@���j@��lG�����A���Zg퓟hh�k]����9R�65q�}C�.�7tކ�=1�$O;n񈺕\!�y��(]n@|����kRI핵��3 5��J�"�d�(�O��AH9�?D�d�rj��߷Ԕ�4���N�}�K���I����
Bi*F�'�����k��g|�A�r�3�Z_w�t�쥍���[��-繽��2����V�`"QLA@��}�\��+�s�t��l4�H��Q`��I(�k�!��e��^S�[[#�S�+*J՛�� �6W:'C���zh�}g˿b�b
��t�_LC:��(Խ��ekd?�@�mX[0��=e�CVy�l��)߯O*�,Ob�� ����Zf\)��=@M>�e�U���C��{��.J̀��_|���I�x. B?����'b��2,]�vE�qM��C��T��:����y�S|�8�����)8�!�*w@�8Cv�ghQ1�gD}_�V�n���x��� i8Zc�)����]�P�1kᓍX�z�J���6�_����}��'�i��A��Pz��"�B5I	�v��.����ٙL^9^;��?�V	r`�̦����K �  Z�_W	���ɒ'�Rl;]ĦT�`�8R��m*�dW�ӌ�K:k� 3B ��C��|Q~ 0$��������?s/�{B�^>���̭�yhW�kE�X�蜕������5���D䗅Y�74�WG|3�R��#.�S=i�52�Q�6��=�'�n)8��nI����G��K�#�w���ǆ�\v��Q�rӵ��*�)\�L���G\!��F՛q79��BY�EA�L�6�	k�}+���qt�]+k*Y����fj����s�NU|�\0��s�![�<��F����︬ 7>�Ěu.T��t 	N�	c��/%��	䟲�Q�?��H
�| ����j��������~*�+k�?������.��~�.��nRb�����Z�8���j�e�z�P�����u$��((B}�+Nc�B'�B��M矤�/��?�%��(%eYi��擓�Eum��CY��ixg:9�r�I��9��y�vAuJV{���xG��ʩ�:n�x"�K
��P�%@���J�5n��=%�8e�[h��bF����9|�/������"<�����Ȍ9���Ɉ���W"����
�t�b���ؖn� ���_���8ء���A���
��r��W��AA�o:P7ٓ'T� j��E��gْvZ+���\Jd���)���4�lL��{7��ƍ��i<��u�q�#�:a��_8��-#=�D�]�R��ƒ�!��_�p�=��@g;W&?�1DR��
zF��~Rk:Yb%��:��nӻ�(|�FQ�l��븠*qA[ٕ�ݎ����Zv6ѻ9���&׏�薚�p\W���)��n�iT�&�
t���Nͼ�X��TM���}S�{1	�x�$]�=���u�muZ_���,���7ϫ4�Ĵ\뤶���0v;h��i�~�j�`'����]��͹2{Ut��x1�����b��^߭�*�p%�@��L�'��t�ѥ�;K��$��t�!Fі
���'�]#֍sXZ�4<p�P0C�!�&�}ǐ�F�s� �z��
i�m1<vΪ#�����e�]����Qr�6���Gr%�{ �?�n���躺�h��߽}�u����ۛ���\l٪"���Z��b���;�&��(b�B�a誫ӌB���K�����d�H,�����4�f�P�w\ڭӴ�y��q���^)�̩h�x�9��q-�!����6����F`{����4�ѫm�'�t��ន
Jx�������� �)���BN�9�a/p{29č���#�/�����s;��Ai��"T��>8E�i~��r:�,��R� ��e�?� ·��m���
l?���H���C��d�o`�B�p]�4�6�m���[�\R"0w�Iy���W�
��eB���h��n��)�Vu�)uI�{AC��� �7�m1D����H�$#�My�e`�,��0n�,�꒬A�cGn*�yU�� w�R@��򟧄;/e��=L�����2l���s
'2N��g�җ�d�Q_�c]�g4Z�U{n���ua��M��iyrrw�a���Y�:}�WǦ�P�$�r�LQ�=q�������a�=������,�Z���xb�-��%(%�$5�<��*莩룤_#�����Ơ���؆��;n�$��:��?T���f��M����T�Yw;;�`�*�o7_�����%Wt�{���<�"��;	���K��ĳ��H���_�E'"g:9�3iGi��J��������/�?~���gr     