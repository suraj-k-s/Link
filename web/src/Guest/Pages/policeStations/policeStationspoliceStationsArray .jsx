import React, { useEffect } from "react";
import { auth, db } from "../../../config/Firebase";
import { deleteUser } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";

const RegisterPoliceStations = () => {
  useEffect(() => {
    // Any initialization code you want to run on component mount
  }, []);

  const districtPlaces = [
    {
        address: "Harippad, Alappuzha",
        email: "harippadalappuzha@gmail.com",
        houseOfficer: "Kutten Pilla",
        houseOfficerId: null,
        password: "harippad@1234",
        phone: 123456789,
        placeId: "MYHP9DKFW7Jvt6KADIDw",
        stationName: "Harippad PS",
        districtId: "XuftjG2a2Sf98U2uKoxj"
    },
    {
        address: "Kayamkulam, Alappuzha",
        email: "kayamkulamalappuzha@gmail.com",
        houseOfficer: "Kutten Pilla",
        houseOfficerId: null,
        password: "kayamkulam@1234",
        phone: 123456789,
        placeId: "SSyP0uZH2oaLnIMAq0BQ",
        stationName: "Kayamkulam PS",
        districtId: "XuftjG2a2Sf98U2uKoxj"
    },
    {
        address: "Mavelikkara, Alappuzha",
        email: "mavelikkaraalappuzha@gmail.com",
        houseOfficer: "Kutten Pilla",
        houseOfficerId: null,
        password: "mavelikkara@1234",
        phone: 123456789,
        placeId: "aObdJ6qDKZqbQl4r0Qyu",
        stationName: "Mavelikkara PS",
        districtId: "XuftjG2a2Sf98U2uKoxj"
    },
    {
        address: "Ambalappuzha, Alappuzha",
        email: "ambalappuzhaalappuzha@gmail.com",
        houseOfficer: "Kutten Pilla",
        houseOfficerId: null,
        password: "ambalappuzha@1234",
        phone: 123456789,
        placeId: "cgWVwv7CfU3uOz9DlIds",
        stationName: "Ambalappuzha PS",
        districtId: "XuftjG2a2Sf98U2uKoxj"
    },
    {
        address: "Cherthala, Alappuzha",
        email: "cherthalaalappuzha@gmail.com",
        houseOfficer: "Kutten Pilla",
        houseOfficerId: null,
        password: "cherthala@1234",
        phone: 123456789,
        placeId: "m3TJpbJHjhXhEoT0BGa7",
        stationName: "Cherthala PS",
        districtId: "XuftjG2a2Sf98U2uKoxj"
    },
    {
        address: "Alappuzha City, Alappuzha",
        email: "alappuzhaalappuzha@gmail.com",
        houseOfficer: "Kutten Pilla",
        houseOfficerId: null,
        password: "alappuzha@1234",
        phone: 123456789,
        placeId: "xXaHGxbCZiQRwhcySaYY",
        stationName: "Alappuzha City PS",
        districtId: "XuftjG2a2Sf98U2uKoxj"
    },
    {
        address: "Chengannur, Alappuzha",
        email: "chengannuralappuzha@gmail.com",
        houseOfficer: "Kutten Pilla",
        houseOfficerId: null,
        password: "chengannur@1234",
        phone: 123456789,
        placeId: "z1qykCFL1kn15yHvgZfX",
        stationName: "Chengannur PS",
        districtId: "XuftjG2a2Sf98U2uKoxj"
    },
    {
        address: "Angamaly, Ernakulam",
        email: "angamalyernakulam@gmail.com",
        houseOfficer: "Kutten Pilla",
        houseOfficerId: null,
        password: "angamaly@1234",
        phone: 123456789,
        placeId: "OYqP5t9L3c1fG6v4Ul1l",
        stationName: "Angamaly PS",
        districtId: "UqC0KyhGm6sYnd6iTepi"
    },
    {
        address: "Kochi, Ernakulam",
        email: "kochiernakulam@gmail.com",
        houseOfficer: "Kutten Pilla",
        houseOfficerId: null,
        password: "kochi@1234",
        phone: 123456789,
        placeId: "QDUFHd5uXM50NEHxdSZZ",
        stationName: "Kochi PS",
        districtId: "UqC0KyhGm6sYnd6iTepi"
    },
    {
        address: "Tripunithura, Ernakulam",
        email: "tripunithuraernakulam@gmail.com",
        houseOfficer: "Kutten Pilla",
        houseOfficerId: null,
        password: "tripunithura@1234",
        phone: 123456789,
        placeId: "bEXihsB6j67xN16Y3wZL",
        stationName: "Tripunithura PS",
        districtId: "UqC0KyhGm6sYnd6iTepi"
    },
    {
        address: "Perumbavoor, Ernakulam",
        email: "perumbavoorernakulam@gmail.com",
        houseOfficer: "Kutten Pilla",
        houseOfficerId: null,
        password: "perumbavoor@1234",
        phone: 123456789,
        placeId: "jUYvqjBDlTiyB5Zsy4y5",
        stationName: "Perumbavoor PS",
        districtId: "UqC0KyhGm6sYnd6iTepi"
    },
    {
        address: "Aluva, Ernakulam",
        email: "aluvaernakulam@gmail.com",
        houseOfficer: "Kutten Pilla",
        houseOfficerId: null,
        password: "aluva@1234",
        phone: 123456789,
        placeId: "opmLsXgrAZsmbuapwXyB",
        stationName: "Aluva PS",
        districtId: "UqC0KyhGm6sYnd6iTepi"
    },
    {
        address: "Muvattupuzha, Ernakulam",
        email: "muvattupuzhaernakulam@gmail.com",
        houseOfficer: "Kutten Pilla",
        houseOfficerId: null,
        password: "muvattupuzha@1234",
        phone: 123456789,
        placeId: "pQd8xgQGzLrF88DxWeNt",
        stationName: "Muvattupuzha PS",
        districtId: "UqC0KyhGm6sYnd6iTepi"
    },
    {
        address: "North Paravoor, Ernakulam",
        email: "northparavoorernakulam@gmail.com",
        houseOfficer: "Kutten Pilla",
        houseOfficerId: null,
        password: "northparavoor@1234",
        phone: 123456789,
        placeId: "sS1kcU8DbbdXNgO09bL5",
        stationName: "North Paravoor PS",
        districtId: "UqC0KyhGm6sYnd6iTepi"
    },
    {
        address: "Ernakulam City, Ernakulam",
        email: "ernakulamernakulam@gmail.com",
        houseOfficer: "Kutten Pilla",
        houseOfficerId: null,
        password: "ernakulam@1234",
        phone: 123456789,
        placeId: "w3kR6nY7NZ84QF8K5sZP",
        stationName: "Ernakulam City PS",
        districtId: "UqC0KyhGm6sYnd6iTepi"
    },
    {
        address: "Vaikom, Kottayam",
        email: "vaikomkottayam@gmail.com",
        houseOfficer: "Kutten Pilla",
        houseOfficerId: null,
        password: "vaikom@1234",
        phone: 123456789,
        placeId: "1rq9ZflU4B9DMHZ0TOb4",
        stationName: "Vaikom PS",
        districtId: "grr355AflhAF9NLxuVrB"
    },
    {
        address: "Pala, Kottayam",
        email: "palakottayam@gmail.com",
        houseOfficer: "Kutten Pilla",
        houseOfficerId: null,
        password: "pala@1234",
        phone: 123456789,
        placeId: "5pwnEElhA9XXpsT4a9q1",
        stationName: "Pala PS",
        districtId: "grr355AflhAF9NLxuVrB"
    },
    {
        address: "Kanjirappally, Kottayam",
        email: "kanjirappallykottayam@gmail.com",
        houseOfficer: "Kutten Pilla",
        houseOfficerId: null,
        password: "kanjirappally@1234",
        phone: 123456789,
        placeId: "7F0gBXhvoBGKGTu5pvKn",
        stationName: "Kanjirappally PS",
        districtId: "grr355AflhAF9NLxuVrB"
    },
    {
        address: "Changanassery, Kottayam",
        email: "changanasserykottayam@gmail.com",
        houseOfficer: "Kutten Pilla",
        houseOfficerId: null,
        password: "changanassery@1234",
        phone: 123456789,
        placeId: "Anmxlf2YVgfy6P6xFyTz",
        stationName: "Changanassery PS",
        districtId: "grr355AflhAF9NLxuVrB"
    },
    {
        address: "Kottayam City, Kottayam",
        email: "kottayamkottayam@gmail.com",
        houseOfficer: "Kutten Pilla",
        houseOfficerId: null,
        password: "kottayam@1234",
        phone: 123456789,
        placeId: "GUJzhXYPBdOpY7C0dXiR",
        stationName: "Kottayam City PS",
        districtId: "grr355AflhAF9NLxuVrB"
    },
    {
        address: "Vaikom, Kottayam",
        email: "vaikomkottayam@gmail.com",
        houseOfficer: "Kutten Pilla",
        houseOfficerId: null,
        password: "vaikom@1234",
        phone: 123456789,
        placeId: "GnOLpWwC2Q6b2W0ONMDg",
        stationName: "Vaikom PS",
        districtId: "grr355AflhAF9NLxuVrB"
    },
    {
        address: "Thalayolaparambu, Kottayam",
        email: "thalayolaparambukottayam@gmail.com",
        houseOfficer: "Kutten Pilla",
        houseOfficerId: null,
        password: "thalayolaparambu@1234",
        phone: 123456789,
        placeId: "QIb08BWGLqCJ3QwkhCIv",
        stationName: "Thalayolaparambu PS",
        districtId: "grr355AflhAF9NLxuVrB"
    },
    {
        address: "Kanjikuzhy, Kottayam",
        email: "kanjikuzhykottayam@gmail.com",
        houseOfficer: "Kutten Pilla",
        houseOfficerId: null,
        password: "kanjikuzhy@1234",
        phone: 123456789,
        placeId: "ROxFTlW7C4fW9a84WjDN",
        stationName: "Kanjikuzhy PS",
        districtId: "grr355AflhAF9NLxuVrB"
    },
    {
        address: "Kaduthuruthy, Kottayam",
        email: "kaduthuruthykottayam@gmail.com",
        houseOfficer: "Kutten Pilla",
        houseOfficerId: null,
        password: "kaduthuruthy@1234",
        phone: 123456789,
        placeId: "g0r1t4om43kE8XsOvzbd",
        stationName: "Kaduthuruthy PS",
        districtId: "grr355AflhAF9NLxuVrB"
    },
    {
        address: "Manarcadu, Kottayam",
        email: "manarcadukottayam@gmail.com",
        houseOfficer: "Kutten Pilla",
        houseOfficerId: null,
        password: "manarcadu@1234",
        phone: 123456789,
        placeId: "iQ1LhZoWtnwucQyM7O8Y",
        stationName: "Manarcadu PS",
        districtId: "grr355AflhAF9NLxuVrB"
    },
    {
        address: "Kumily, Idukki",
        email: "kumilyidukki@gmail.com",
        houseOfficer: "Kutten Pilla",
        houseOfficerId: null,
        password: "kumily@1234",
        phone: 123456789,
        placeId: "0uLO73tq5WBRbc7yWwsM",
        stationName: "Kumily PS",
        districtId: "rXdsEZ12xPhSLWweRmH9"
    },
    {
        address: "Munnar, Idukki",
        email: "munnaridukki@gmail.com",
        houseOfficer: "Kutten Pilla",
        houseOfficerId: null,
        password: "munnar@1234",
        phone: 123456789,
        placeId: "4gCJy3zXdOaPCV0POir4",
        stationName: "Munnar PS",
        districtId: "rXdsEZ12xPhSLWweRmH9"
    },
    {
        address: "Thodupuzha, Idukki",
        email: "thodupuzhaidukki@gmail.com",
        houseOfficer: "Kutten Pilla",
        houseOfficerId: null,
        password: "thodupuzha@1234",
        phone: 123456789,
        placeId: "6psSXX7zkq50IrwCMZGG",
        stationName: "Thodupuzha PS",
        districtId: "rXdsEZ12xPhSLWweRmH9"
    },
    {
        address: "Adimaly, Idukki",
        email: "adimalyidukki@gmail.com",
        houseOfficer: "Kutten Pilla",
        houseOfficerId: null,
        password: "adimaly@1234",
        phone: 123456789,
        placeId: "8eqEjufNfrZydACFQspc",
        stationName: "Adimaly PS",
        districtId: "rXdsEZ12xPhSLWweRmH9"
    },
    {
        address: "Thripunithura, Ernakulam",
        email: "thripunithuraernakulam@gmail.com",
        houseOfficer: "Kutten Pilla",
        houseOfficerId: null,
        password: "thripunithura@1234",
        phone: 123456789,
        placeId: "fBhQ1LIGCK8pQfknGTTk",
        stationName: "Thripunithura PS",
        districtId: "UqC0KyhGm6sYnd6iTepi"
    },
    {
        address: "Aluva, Ernakulam",
        email: "aluvaernakulam@gmail.com",
        houseOfficer: "Kutten Pilla",
        houseOfficerId: null,
        password: "aluva@1234",
        phone: 123456789,
        placeId: "gaFhldhnPSeiyFRpsfh3",
        stationName: "Aluva PS",
        districtId: "UqC0KyhGm6sYnd6iTepi"
    },
    {
        address: "Muvattupuzha, Ernakulam",
        email: "muvattupuzhaernakulam@gmail.com",
        houseOfficer: "Kutten Pilla",
        houseOfficerId: null,
        password: "muvattupuzha@1234",
        phone: 123456789,
        placeId: "iWBKUbCcKlxYX2MZ6Sgf",
        stationName: "Muvattupuzha PS",
        districtId: "UqC0KyhGm6sYnd6iTepi"
    },
    {
        address: "Vadakara, Kozhikode",
        email: "vadakarakozhikode@gmail.com",
        houseOfficer: "Kutten Pilla",
        houseOfficerId: null,
        password: "vadakara@1234",
        phone: 123456789,
        placeId: "8XrH1Lsc5KqZzf9fGzGw",
        stationName: "Vadakara PS",
        districtId: "VqhylatW0r62ROZkP9h8"
    },
    {
        address: "Koyilandy, Kozhikode",
        email: "koyilandykozhikode@gmail.com",
        houseOfficer: "Kutten Pilla",
        houseOfficerId: null,
        password: "koyilandy@1234",
        phone: 123456789,
        placeId: "CmG3kf0E9idpnBFp6FFn",
        stationName: "Koyilandy PS",
        districtId: "VqhylatW0r62ROZkP9h8"
    },
    {
        address: "Koduvally, Kozhikode",
        email: "koduvallykozhikode@gmail.com",
        houseOfficer: "Kutten Pilla",
        houseOfficerId: null,
        password: "koduvally@1234",
        phone: 123456789,
        placeId: "E8FiHApRq5X55YRzGZAP",
        stationName: "Koduvally PS",
        districtId: "VqhylatW0r62ROZkP9h8"
    },
    {
        address: "Kunnamangalam, Kozhikode",
        email: "kunnamangalamkozhikode@gmail.com",
        houseOfficer: "Kutten Pilla",
        houseOfficerId: null,
        password: "kunnamangalam@1234",
        phone: 123456789,
        placeId: "G7kLi7hxHNu87Y9UG23j",
        stationName: "Kunnamangalam PS",
        districtId: "VqhylatW0r62ROZkP9h8"
    },
    {
        address: "Thamarassery, Kozhikode",
        email: "thamarasserykozhikode@gmail.com",
        houseOfficer: "Kutten Pilla",
        houseOfficerId: null,
        password: "thamarassery@1234",
        phone: 123456789,
        placeId: "JpoyJ4DgPh6Z4a0KRRKS",
        stationName: "Thamarassery PS",
        districtId: "VqhylatW0r62ROZkP9h8"
    },
    {
        address: "Perambra, Kozhikode",
        email: "perambrakozhikode@gmail.com",
        houseOfficer: "Kutten Pilla",
        houseOfficerId: null,
        password: "perambra@1234",
        phone: 123456789,
        placeId: "KN6PhJfqoHAtH4g1s2Kk",
        stationName: "Perambra PS",
        districtId: "VqhylatW0r62ROZkP9h8"
    },
    {
        address: "Nadapuram, Kozhikode",
        email: "nadapuramkozhikode@gmail.com",
        houseOfficer: "Kutten Pilla",
        houseOfficerId: null,
        password: "nadapuram@1234",
        phone: 123456789,
        placeId: "MYs0T39wuxrRukJorLCd",
        stationName: "Nadapuram PS",
        districtId: "VqhylatW0r62ROZkP9h8"
    },
    {
        address: "Thalassery, Kannur",
        email: "thalasserykannur@gmail.com",
        houseOfficer: "Kutten Pilla",
        houseOfficerId: null,
        password: "thalassery@1234",
        phone: 123456789,
        placeId: "c9bHBY04k0SN1Z9pucKd",
        stationName: "Thalassery PS",
        districtId: "cKQWi5hGSBCUfCxIr08P"
    },
    {
        address: "Kannur City, Kannur",
        email: "kannurkannur@gmail.com",
        houseOfficer: "Kutten Pilla",
        houseOfficerId: null,
        password: "kannur@1234",
        phone: 123456789,
        placeId: "hbOlAatNIzlaNv67DDt8",
        stationName: "Kannur City PS",
        districtId: "cKQWi5hGSBCUfCxIr08P"
    },
    {
        address: "Thaliparamba, Kannur",
        email: "thaliparambakannur@gmail.com",
        houseOfficer: "Kutten Pilla",
        houseOfficerId: null,
        password: "thaliparamba@1234",
        phone: 123456789,
        placeId: "hy5bUcPz2s40yadM26F8",
        stationName: "Thaliparamba PS",
        districtId: "cKQWi5hGSBCUfCxIr08P"
    },
    {
        address: "Iritty, Kannur",
        email: "irittykannur@gmail.com",
        houseOfficer: "Kutten Pilla",
        houseOfficerId: null,
        password: "iritty@1234",
        phone: 123456789,
        placeId: "mNufQ4khm0M3FlQAC3Qb",
        stationName: "Iritty PS",
        districtId: "cKQWi5hGSBCUfCxIr08P"
    },
    {
        address: "Payyannur, Kannur",
        email: "payyannurkannur@gmail.com",
        houseOfficer: "Kutten Pilla",
        houseOfficerId: null,
        password: "payyannur@1234",
        phone: 123456789,
        placeId: "qEH5YDiDvfiabgC5WNFi",
        stationName: "Payyannur PS",
        districtId: "cKQWi5hGSBCUfCxIr08P"
    },
    {
        address: "Mattannur, Kannur",
        email: "mattannurkannur@gmail.com",
        houseOfficer: "Kutten Pilla",
        houseOfficerId: null,
        password: "mattannur@1234",
        phone: 123456789,
        placeId: "sVl7cDZ7UoBqIqB9ypHd",
        stationName: "Mattannur PS",
        districtId: "cKQWi5hGSBCUfCxIr08P"
    },
    {
        address: "Kasaragod, Kasaragod",
        email: "kasaragodkasaragod@gmail.com",
        houseOfficer: "Kutten Pilla",
        houseOfficerId: null,
        password: "kasaragod@1234",
        phone: 123456789,
        placeId: "02M7RGlntdm18wQ7JcW8",
        stationName: "Kasaragod PS",
        districtId: "eDOzGPkKmDF6ilQX7sZm"
    },
    {
        address: "Kanhangad, Kasaragod",
        email: "kanhangadkasaragod@gmail.com",
        houseOfficer: "Kutten Pilla",
        houseOfficerId: null,
        password: "kanhangad@1234",
        phone: 123456789,
        placeId: "4Y0FD3g9W5b2s8juMOrG",
        stationName: "Kanhangad PS",
        districtId: "eDOzGPkKmDF6ilQX7sZm"
    },
    {
        address: "Hosdurg, Kasaragod",
        email: "hosdurgkasaragod@gmail.com",
        houseOfficer: "Kutten Pilla",
        houseOfficerId: null,
        password: "hosdurg@1234",
        phone: 123456789,
        placeId: "D7Ys0Rd4qR0MNYv2gExb",
        stationName: "Hosdurg PS",
        districtId: "eDOzGPkKmDF6ilQX7sZm"
    },
    {
        address: "Nileshwaram, Kasaragod",
        email: "nileshwaramkasaragod@gmail.com",
        houseOfficer: "Kutten Pilla",
        houseOfficerId: null,
        password: "nileshwaram@1234",
        phone: 123456789,
        placeId: "L5BoDpSWPZRXJRTDfRkq",
        stationName: "Nileshwaram PS",
        districtId: "eDOzGPkKmDF6ilQX7sZm"
    },
    {
        address: "Thrikarippur, Kasaragod",
        email: "thrikarippurkasaragod@gmail.com",
        houseOfficer: "Kutten Pilla",
        houseOfficerId: null,
        password: "thrikarippur@1234",
        phone: 123456789,
        placeId: "P9vPKU9DKtITm4a5IbZW",
        stationName: "Thrikarippur PS",
        districtId: "eDOzGPkKmDF6ilQX7sZm"
    },
    {
        address: "Manjeshwaram, Kasaragod",
        email: "manjeshwaramkasaragod@gmail.com",
        houseOfficer: "Kutten Pilla",
        houseOfficerId: null,
        password: "manjeshwaram@1234",
        phone: 123456789,
        placeId: "UR4x6JNDYGZw9L9ZkV5H",
        stationName: "Manjeshwaram PS",
        districtId: "eDOzGPkKmDF6ilQX7sZm"
    },
    {
        address: "Kottayam, Kottayam",
        email: "kottayamkottayam@gmail.com",
        houseOfficer: "Kutten Pilla",
        houseOfficerId: null,
        password: "kottayam@1234",
        phone: 123456789,
        placeId: "mstITEDb23ZN4d91ZWm2",
        stationName: "Kottayam PS",
        districtId: "grr355AflhAF9NLxuVrB"
    },
    {
        address: "Ponkunnam, Kottayam",
        email: "ponkunnamkottayam@gmail.com",
        houseOfficer: "Kutten Pilla",
        houseOfficerId: null,
        password: "ponkunnam@1234",
        phone: 123456789,
        placeId: "BQtnxuf3GYM4IQfXzTyN",
        stationName: "Ponkunnam PS",
        districtId: "grr355AflhAF9NLxuVrB"
    },
    {
        address: "Ettumanoor, Kottayam",
        email: "ettumanoorkottayam@gmail.com",
        houseOfficer: "Kutten Pilla",
        houseOfficerId: null,
        password: "ettumanoor@1234",
        phone: 123456789,
        placeId: "9gCpeSgs98Fw2yTIRXn8",
        stationName: "Ettumanoor PS",
        districtId: "grr355AflhAF9NLxuVrB"
    },
    {
        address: "Ayarkunnam, Kottayam",
        email: "ayarkunnamkottayam@gmail.com",
        houseOfficer: "Kutten Pilla",
        houseOfficerId: null,
        password: "ayarkunnam@1234",
        phone: 123456789,
        placeId: "MLnv2eK0Hm8SdLv8UMlm",
        stationName: "Ayarkunnam PS",
        districtId: "grr355AflhAF9NLxuVrB"
    },
    {
        address: "Vakathanam, Kottayam",
        email: "vakathanamkottayam@gmail.com",
        houseOfficer: "Kutten Pilla",
        houseOfficerId: null,
        password: "vakathanam@1234",
        phone: 123456789,
        placeId: "qDkoySli6R7ERUQvXkxt",
        stationName: "Vakathanam PS",
        districtId: "grr355AflhAF9NLxuVrB"
    },
    {
        address: "Melukavu, Kottayam",
        email: "melukavukottayam@gmail.com",
        houseOfficer: "Kutten Pilla",
        houseOfficerId: null,
        password: "melukavu@1234",
        phone: 123456789,
        placeId: "r1GSJlRRikrPEAcd9Cxh",
        stationName: "Melukavu PS",
        districtId: "grr355AflhAF9NLxuVrB"
    },
    {
        address: "Kaduthuruthy, Kottayam",
        email: "kaduthuruthykottayam@gmail.com",
        houseOfficer: "Kutten Pilla",
        houseOfficerId: null,
        password: "kaduthuruthy@1234",
        phone: 123456789,
        placeId: "CszqAxWDlr03KvV6wTDw",
        stationName: "Kaduthuruthy PS",
        districtId: "grr355AflhAF9NLxuVrB"
    },
    {
        address: "Kuravilangad, Kottayam",
        email: "kuravilangadkottayam@gmail.com",
        houseOfficer: "Kutten Pilla",
        houseOfficerId: null,
        password: "kuravilangad@1234",
        phone: 123456789,
        placeId: "GqHlbdHs5RouVhliFJhP",
        stationName: "Kuravilangad PS",
        districtId: "grr355AflhAF9NLxuVrB"
    },
    {
        address: "Changanassery, Kottayam",
        email: "changanasserykottayam@gmail.com",
        houseOfficer: "Kutten Pilla",
        houseOfficerId: null,
        password: "changanassery@1234",
        phone: 123456789,
        placeId: "cLzyNlZjVYXHV4B48VYZ",
        stationName: "Changanassery PS",
        districtId: "grr355AflhAF9NLxuVrB"
    },
    {
        address: "Palai, Kottayam",
        email: "palakkadkottayam@gmail.com",
        houseOfficer: "Kutten Pilla",
        houseOfficerId: null,
        password: "palakkad@1234",
        phone: 123456789,
        placeId: "IsmQOeL7fUqEr8dS4txz",
        stationName: "Palai PS",
        districtId: "grr355AflhAF9NLxuVrB"
    },
    {
        address: "Kumarakom, Kottayam",
        email: "kumarakomkottayam@gmail.com",
        houseOfficer: "Kutten Pilla",
        houseOfficerId: null,
        password: "kumarakom@1234",
        phone: 123456789,
        placeId: "2dW9k4nM89vRVD8n9Uf9",
        stationName: "Kumarakom PS",
        districtId: "grr355AflhAF9NLxuVrB"
    },
    {
        address: "Thalayolaparambu, Kottayam",
        email: "thalayolaparambukottayam@gmail.com",
        houseOfficer: "Kutten Pilla",
        houseOfficerId: null,
        password: "thalayolaparambu@1234",
        phone: 123456789,
        placeId: "P0ONvB2cl1YFcFhCZDAJ",
        stationName: "Thalayolaparambu PS",
        districtId: "grr355AflhAF9NLxuVrB"
    },
    {
        address: "Kanjikuzhy, Kottayam",
        email: "kanjikuzhykottayam@gmail.com",
        houseOfficer: "Kutten Pilla",
        houseOfficerId: null,
        password: "kanjikuzhy@1234",
        phone: 123456789,
        placeId: "snKG1PfK7sBOqhdQ4ZIf",
        stationName: "Kanjikuzhy PS",
        districtId: "grr355AflhAF9NLxuVrB"
    },
    {
        address: "Manarcadu, Kottayam",
        email: "manarcadukottayam@gmail.com",
        houseOfficer: "Kutten Pilla",
        houseOfficerId: null,
        password: "manarcadu@1234",
        phone: 123456789,
        placeId: "T5s8cglcBNjbpUYlH16I",
        stationName: "Manarcadu PS",
        districtId: "grr355AflhAF9NLxuVrB"
    },
    {
        address: "Kuravilangad, Kottayam",
        email: "kuravilangadkottayam@gmail.com",
        houseOfficer: "Kutten Pilla",
        houseOfficerId: null,
        password: "kuravilangad@1234",
        phone: 123456789,
        placeId: "sKH9cyJAxrE3fYdpfxf5",
        stationName: "Kuravilangad PS",
        districtId: "grr355AflhAF9NLxuVrB"
    },
    {
        address: "Changanassery, Kottayam",
        email: "changanasserykottayam@gmail.com",
        houseOfficer: "Kutten Pilla",
        houseOfficerId: null,
        password: "changanassery@1234",
        phone: 123456789,
        placeId: "VZ3tV60Vmf3UdcxX40Lh",
        stationName: "Changanassery PS",
        districtId: "grr355AflhAF9NLxuVrB"
    },
    {
        address: "Palai, Kottayam",
        email: "palaikottayam@gmail.com",
        houseOfficer: "Kutten Pilla",
        houseOfficerId: null,
        password: "palai@1234",
        phone: 123456789,
        placeId: "lMJ4aDtPS4qcdR9g4vzV",
        stationName: "Palai PS",
        districtId: "grr355AflhAF9NLxuVrB"
    },
    {
        address: "Kumarakom, Kottayam",
        email: "kumarakomkottayam@gmail.com",
        houseOfficer: "Kutten Pilla",
        houseOfficerId: null,
        password: "kumarakom@1234",
        phone: 123456789,
        placeId: "6UEjvZ0G3lYpZaN3WzX4",
        stationName: "Kumarakom PS",
        districtId: "grr355AflhAF9NLxuVrB"
    },
    {
        address: "Kayamkulam, Alappuzha",
        email: "kayamkulamalappuzha@gmail.com",
        houseOfficer: "Kutten Pilla",
        houseOfficerId: null,
        password: "kayamkulam@1234",
        phone: 123456789,
        placeId: "wBiJYw12FUVgIkyx6Smh",
        stationName: "Kayamkulam PS",
        districtId: "ODDGqWlZYObnLki5iBxG"
    },
    {
        address: "Mavelikara, Alappuzha",
        email: "mavelikaraalappuzha@gmail.com",
        houseOfficer: "Kutten Pilla",
        houseOfficerId: null,
        password: "mavelikara@1234",
        phone: 123456789,
        placeId: "8aFHDfe3vgsGkm5fdRau",
        stationName: "Mavelikara PS",
        districtId: "ODDGqWlZYObnLki5iBxG"
    },
    {
        address: "Chengannur, Alappuzha",
        email: "chengannuralappuzha@gmail.com",
        houseOfficer: "Kutten Pilla",
        houseOfficerId: null,
        password: "chengannur@1234",
        phone: 123456789,
        placeId: "6DbKgFU3cqgezS4JCbpi",
        stationName: "Chengannur PS",
        districtId: "ODDGqWlZYObnLki5iBxG"
    },
    {
        address: "Harippad, Alappuzha",
        email: "harippadalappuzha@gmail.com",
        houseOfficer: "Kutten Pilla",
        houseOfficerId: null,
        password: "harippad@1234",
        phone: 123456789,
        placeId: "nC14JtznsWeUVJLIGzAk",
        stationName: "Harippad PS",
        districtId: "ODDGqWlZYObnLki5iBxG"
    },
    {
        address: "Mannar, Alappuzha",
        email: "mannaralappuzha@gmail.com",
        houseOfficer: "Kutten Pilla",
        houseOfficerId: null,
        password: "mannar@1234",
        phone: 123456789,
        placeId: "h3dXL5DqVbzA0qntoGFD",
        stationName: "Mannar PS",
        districtId: "ODDGqWlZYObnLki5iBxG"
    },
    {
        address: "Kayamkulam, Alappuzha",
        email: "kayamkulamalappuzha@gmail.com",
        houseOfficer: "Kutten Pilla",
        houseOfficerId: null,
        password: "kayamkulam@1234",
        phone: 123456789,
        placeId: "mDW2Adm3TqGo82Sw6GHj",
        stationName: "Kayamkulam PS",
        districtId: "ODDGqWlZYObnLki5iBxG"
    },
    {
        address: "Mavelikara, Alappuzha",
        email: "mavelikaraalappuzha@gmail.com",
        houseOfficer: "Kutten Pilla",
        houseOfficerId: null,
        password: "mavelikara@1234",
        phone: 123456789,
        placeId: "rQiMzX7vF5zue1x0kfPm",
        stationName: "Mavelikara PS",
        districtId: "ODDGqWlZYObnLki5iBxG"
    },
    {
        address: "Chengannur, Alappuzha",
        email: "chengannuralappuzha@gmail.com",
        houseOfficer: "Kutten Pilla",
        houseOfficerId: null,
        password: "chengannur@1234",
        phone: 123456789,
        placeId: "Q8MReO3Wg7SrePQMCQoZ",
        stationName: "Chengannur PS",
        districtId: "ODDGqWlZYObnLki5iBxG"
    },
    {
        address: "Harippad, Alappuzha",
        email: "harippadalappuzha@gmail.com",
        houseOfficer: "Kutten Pilla",
        houseOfficerId: null,
        password: "harippad@1234",
        phone: 123456789,
        placeId: "UBvcEjm9uMMExaqK3W6n",
        stationName: "Harippad PS",
        districtId: "ODDGqWlZYObnLki5iBxG"
    },
    {
        address: "Mannar, Alappuzha",
        email: "mannaralappuzha@gmail.com",
        houseOfficer: "Kutten Pilla",
        houseOfficerId: null,
        password: "mannar@1234",
        phone: 123456789,
        placeId: "meeHYo7WYj2l9GSOuRb2",
        stationName: "Mannar PS",
        districtId: "ODDGqWlZYObnLki5iBxG"
    }
];



  const registerPoliceStations = async () => {
    try {
      for (const stationData of districtPlaces) {
        const { email } = stationData;

        // Check if police station email already exists before adding data
        const existingStationQuery = await getDoc(
          doc(db, "police_station_collection", email)
        );

        if (existingStationQuery.exists()) {
          console.log(`Police station with email ${email} already exists, skipping.`);
        } else {
          try {
            // Register user with email and password
            const userCredential = await createUserWithEmailAndPassword(
              auth,
              email,
              stationData.password
            );

            // Get the user's UID
            const userId = userCredential.user.uid;

            // Add police station data to Firestore
            await setDoc(doc(db, "police_station_collection", userId), stationData);

            console.log(`Police station with email ${email} added successfully!`);
          } catch (error) {
            // Handle email-already-in-use error
            if (error.code === "auth/email-already-in-use") {
              console.log(`Email ${email} is already in use, skipping registration.`);
            } else {
              throw error; // Throw other errors
            }
          }
        }
      }
    } catch (error) {
      console.error("Error registering police stations:", error);
    }
  };
  const deletePoliceStations = async () => {
    try {
      for (const stationData of districtPlaces) {
        const { email, password } = stationData;
  
        // Sign in with email and password
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        const userId = userCredential.user.uid;
  
        // Delete the user from authentication
        await userCredential.user.delete();
  
        // Delete police station data from Firestore
        await deleteDoc(doc(db, "police_station_collection", userId));
  
        console.log(`Police station with email ${email} deleted successfully!`);
      }
    } catch (error) {
      console.error("Error deleting police stations:", error);
    }
  };


  return (
    <div>
      <button onClick={registerPoliceStations}>Register Police Stations</button>
      <button onClick={deletePoliceStations}>Delete Police Stations</button>
    </div>
  );
};

export default RegisterPoliceStations;
