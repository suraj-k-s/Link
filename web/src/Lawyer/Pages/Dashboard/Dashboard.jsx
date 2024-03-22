import "./dashboard.css";
import bgv from "../../assets/lawyerHero.mp4";

import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

import img1 from "../../assets/icons/connection.png"
import img2 from "../../assets/icons/backgroundCheck.png"
import img3 from "../../assets/icons/case.png"
import img4 from "../../assets/icons/client.png"

const Dashboard = () => {
  return (
    <div className="Dashboard">
      <div className="hero">
        <div className="left">
          <div className="heroText">
            <h3>NAVIGATE </h3>
            <h1>LEGAL</h1>
            <h3>FRONTIERS</h3>
          </div>
        </div>
        <div className="right">
          <video
            src={bgv}
            autoplay="autoplay"
            muted="muted"
            loop="loop"
          ></video>
        </div>
      </div>
      <main>
        <div className="services">
          <Link to="./clients">
            <div className="service">
              <div class="card-client">
                <div class="Service-picture">
                  <img src={img4} alt="img" />
                </div>
                <p class="name-client">My clients</p>
              </div>
            </div>
          </Link>
          <div className="service">
            <Link to="./MyCases">
              <div className="sTitle"></div>
              <div class="card-client">
                <div class="Service-picture">
                  <img src={img3} alt="img" />
                </div>
                <p class="name-client"> Case</p>
              </div>
            </Link>
          </div>
          <div className="service">
            <Link to="./ClientRequestsPage">
              <div class="card-client">
                <div class="Service-picture">
                  <img src={img1} alt="img" />
                </div>
                <p class="name-client">client Requests</p>
              </div>
            </Link>
          </div>
          {/* <div className="service">
            <Link to="./Search">
              <div class="card-client">
                <div class="Service-picture">
                  <img src={img2} alt="img" />
                </div>
                <p class="name-client"> Search user</p>
              </div>
            </Link>
          </div> */}
        </div>
      </main>
      <article>
        <div className="articleHeading">
          <Typography variant="h3">Articles</Typography>
        </div>
        <div className="articleContent">
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quidem
            voluptatem facilis id doloremque doloribus magnam corrupti eaque
            cumque repellat in maxime voluptas nemo aliquam, aspernatur rem
            voluptatum fuga fugiat consequuntur quas harum beatae numquam.
            Exercitationem harum corporis similique voluptate enim quo
            dignissimos velit numquam reprehenderit nesciunt soluta culpa esse,
            eum facere odit ut molestias obcaecati eaque est! Aliquam possimus
            accusamus quas maiores cupiditate doloremque illum alias ullam
            expedita amet fugiat commodi pariatur facilis blanditiis, minima
            consequatur quae delectus eos laborum asperiores, magni molestiae.
            Quibusdam, fugiat? Quod atque pariatur excepturi modi earum, hic
            voluptatum dignissimos, asperiores eaque minima veniam, recusandae
            reprehenderit.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor
            molestias totam sint suscipit veniam explicabo velit cumque
            dignissimos recusandae, officia expedita quia, mollitia iusto eaque
            voluptatum saepe voluptatem qui assumenda aspernatur ipsa. Corrupti
            cupiditate similique laborum, earum odio commodi saepe eius a quidem
            dolores hic laudantium perferendis doloribus veniam voluptatum rem
            in beatae eveniet minus at nam sit qui exercitationem maxime? Est
            omnis vel quos libero maiores id corporis commodi aliquid nobis
            doloribus. Aspernatur, error repellat, impedit facere consequuntur
            autem suscipit maiores eveniet officia quasi, provident ut expedita
            reprehenderit? Iste aperiam nostrum asperiores ea perspiciatis
            temporibus hic expedita. Nam explicabo dicta quae, inventore rem
            repudiandae adipisci sint dolor temporibus! Cupiditate, tempore
            porro laudantium nobis vitae ab itaque adipisci quia accusamus
            eligendi ipsa id reiciendis. Soluta aut, autem vero, quos distinctio
            iusto architecto tempore ullam sequi libero a, reprehenderit maxime
            ratione voluptate nemo? Ipsa assumenda animi magnam dolor similique
            ullam vero distinctio quod, illum maiores natus reiciendis voluptate
            quam quos tempore recusandae. Vel quia, optio qui quos eligendi
            atque aliquam? Aperiam, asperiores quisquam praesentium, sapiente
            optio, quos ratione quod eos velit dolor mollitia impedit. A
            blanditiis quos quidem doloribus amet, laboriosam fugit ea expedita
            iure accusamus adipisci dicta, iste natus fuga.
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod
            similique cumque ipsam autem ut commodi quae consequatur quo, dicta
            adipisci dolore id esse quam quos aliquid accusantium eligendi
            repellendus delectus libero. Totam blanditiis officia asperiores sed
            eos, temporibus dolorem beatae nisi hic repellat repudiandae,
            adipisci vitae omnis perspiciatis soluta non illo sunt a, in quae
            ipsa. Praesentium, incidunt id? Soluta nesciunt nisi unde laboriosam
            nulla quae consequuntur quos culpa eius, modi facere excepturi in
            est reiciendis quo illo ab voluptatem! Voluptate, accusantium beatae
            veritatis fugit molestiae saepe, libero nam dolores omnis, neque
            animi facilis est laborum. Saepe esse nemo accusantium, unde, neque
            eum aspernatur sunt voluptas consequatur, natus dolorum. Vero ipsum
            harum animi, minima voluptatibus rerum ducimus ad fugiat culpa
            debitis doloremque aliquid quos aliquam cumque dolor. Porro illo
            doloremque dolorem atque reprehenderit molestiae sit, dolor odio
            totam asperiores, veniam et ullam quod libero distinctio cum nam,
            sunt laboriosam blanditiis?
          </p>
        </div>
      </article>
    </div>
  );
};

export default Dashboard;
