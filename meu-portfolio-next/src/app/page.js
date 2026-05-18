"use client"; // <--- REGRA DE OURO: Permite o uso de useState e useEffect no Next.js

import React, { useState, useEffect } from 'react';
import Image from 'next/image'; // <--- O componente de imagem ultra-otimizado do Next.js
import './globals.css'; // <--- No Next, usamos o globals.css para estilos globais
import fotoPerfil from '../../public/foto-curriculo.jpg'; // <--- Buscando a foto na pasta public (ajustaremos isso já já)

export default function Home() { // <--- O Next prefere exportar a função principal da página assim
  // Estados para controlar a navegação e a API
  const [paginaAtiva, setPaginaAtiva] = useState('home');
  const [climaInfo, setClimaInfo] = useState('Carregando dados do clima...');

  // Integração da sua API Dupla (antigo script.js convertido para React)
  useEffect(() => {
    async function buscarClimaInteligente() {
      let cidade = "Jaboatão dos Guararapes";
      let estado = "PE";
      let lat = -8.11;
      let lon = -34.92;

      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000);

        const respostaGeolocalizacao = await fetch('https://ipapi.co/json/', { signal: controller.signal });
        clearTimeout(timeoutId);
        
        if (respostaGeolocalizacao.ok) {
          const dadosLocal = await respostaGeolocalizacao.json();
          if (dadosLocal.city && dadosLocal.latitude) {
            cidade = dadosLocal.city;
            estado = dadosLocal.region_code;
            lat = dadosLocal.latitude;
            lon = dadosLocal.longitude;
          }
        }
      } catch (erro) {
        console.log("Geolocalização dinâmica bloqueada ou lenta. Usando cidade padrão.");
      }

      try {
        const urlClima = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
        const respostaClima = await fetch(urlClima);
        const dadosClima = await respostaClima.json();
        const temperatura = dadosClima.current_weather.temperature;
        
        setClimaInfo(`📍 ${cidade}/${estado}: ${temperatura}°C (Atualizado em tempo real)`);
      } catch (erroClima) {
        setClimaInfo("Não foi possível carregar os dados do clima.");
        console.error("Erro na API de clima:", erroClima);
      }
    }

    buscarClimaInteligente();
  }, []);

  // Função para renderizar dinamicamente a página escolhida no menu
  const renderConteudo = () => {
    switch (paginaAtiva) {
      case 'home':
        return (
          <div className="conteudo-pagina">
            <div className="intro">
              <h1>Currículo Profissional - Gabriel Soares</h1>
            </div>
            <div className="definição">
              <h2>Objetivo Profissional</h2>
              <p>
                <b><i>Atuar como estagiário na área de redes e infraestrutura de TI, contribuindo para o monitoramento
                e manutenção de sistemas, enquanto desenvolvo experiência prática e aprimoro meus
                conhecimentos técnicos. Além disso, contribuir através da liderança, proatividade e o trabalho
                em equipe. Além disso, levar experiência não só para única área da vida cotidiana, mas também para outras áreas correlatas.</i></b>
              </p>
              
              <ul style={{ listStyleType: 'disc', paddingLeft: '20px', margin: '15px 0' }}>
                <li><button className="link-fake-botao" onClick={() => setPaginaAtiva('sobre')}>Sobre</button></li>
                <li><button className="link-fake-botao" onClick={() => setPaginaAtiva('experiencias')}>Experiências</button></li>
                <li><button className="link-fake-botao" onClick={() => setPaginaAtiva('projetos')}>Projetos desenvolvidos</button></li>
                <li><button className="link-fake-botao" onClick={() => setPaginaAtiva('formacao')}>Formação Acadêmica</button></li>
              </ul>
            </div>
            
            <section>
              <div className="imagem1">
                {/* Usando o componente otimizado do Next.js */}
                <Image src={fotoPerfil} alt="Sua Foto de Perfil" placeholder="blur" />
              </div>
            </section>
            
            <div className="definição" id="bloco-clima" style={{ marginTop: '30px', marginBottom: '20px' }}>
              <p style={{ margin: 0, textAlign: 'center' }}>
                <strong>{climaInfo}</strong>
              </p>
            </div>
          </div>
        );

      case 'sobre':
        return (
          <div className="conteudo-pagina">
            <div className="intro">
              <h1>Sobre o Desenvolvimento</h1>
            </div>
            <div className="definição">
              <h2>Arquitetura e Tecnologias Utilizadas</h2>
              <p>
                Este currículo profissional foi projetado com o objetivo de unir conceitos fundamentais 
                de design de interface (Front-End) com otimização de tempo de carregamento e performance. 
                A estrutura do projeto baseia-se nas seguintes especificações técnicas:
              </p>

              <ul className="lista-projetos">
                <li><b>Estrutura Semântica:</b> Construída em HTML5 para garantir a acessibilidade e boa indexação.</li>
                <li><b>Estilização Avançada:</b> Desenvolvida em CSS3 nativo, aplicando conceitos de reaproveitamento de classes, layouts fluidos e gerenciamento de paleta de cores neutras (SlateGray).</li>
                <li><b>Lógica e Dinamismo:</b> Utilização de JavaScript (ES6) para manipulação assíncrona do DOM e requisições HTTP externas.</li>
                <li><b>Integração com API REST:</b> Consumo de API pública em tempo real para alimentação dinâmica de dados do sistema.</li>
                <li><b>Componentização e Deploy:</b> Estrutura migrada para a biblioteca React e hospedagem contínua através da plataforma Vercel, visando escalabilidade.</li>
              </ul>
            </div>
          </div>
        );

      case 'experiencias':
        return (
          <div className="conteudo-pagina">
            <div className="intro">
              <h1>Experiência Profissional</h1>
            </div>
            <div className="definição">
              <h2>Jovem Aprendiz | Camed MicroCredito</h2>
              <p><b>Cargo atual</b></p>
              <p><i>Auxiliar nas demandas internas, gerenciando tarefas e documentos em equipe. 
                 Responsável pelo desenvolvimento e organização de planilhas.</i></p>
            </div>
            <br />
            <div className="definição">
              <h2>Monitor de Matemática - Estado de PE (2024)</h2>
              <p><b>ETE Cícero Dias</b></p>
              <p><i>Atuação como monitor, ministrando aulas de reforço para outros estudantes. 
                 Desenvolvimento de habilidades essenciais como liderança, comunicação e trabalho em grupo.</i></p>
            </div>
          </div>
        );

      case 'formacao':
        return (
          <div className="conteudo-pagina">
            <div className="intro">
              <h1>Formação Acadêmica</h1>
            </div>
            <div className="definição">
              <h2>Sistemas para Internet | 2025 - 2027</h2>
              <p><b>3° Período - UNICAP</b></p>
              <p><i>Atualmente cursando o 3° período do curso de Sistemas para Internet na UNICAP. 
                 O curso abrange uma variedade de disciplinas, incluindo programação, desenvolvimento web, banco de dados e design de interfaces. 
                 Estou adquirindo conhecimentos técnicos essenciais para a área de TI, além de desenvolver habilidades práticas por meio de projetos acadêmicos.</i></p>

              <h2>Técnico em Programação | 2024</h2>
              <p><b>ETE Cícero Dias</b></p>
              <p><i>Ensino médio integrado ao curso técnico de programação.</i></p>
            </div>
          </div>
        );

      case 'projetos':
        return (
          <div className="conteudo-pagina">
            <div className="definição">
              <h2>Projetos Formais</h2>
              <ul className="lista-projetos">
                <li>Projeto sustentável premiado no TBS 2020</li>
                <li>Grow Up Unicap + Porto Digital - 2026</li>
                <li>Rise Up em parceria com a Beyond 2025</li>
                <li>Participação na palestra sobre inovação e tecnologia - como está o uso da IA - 2026</li>
              </ul>

              <div className="container-link">
                <p>Link com detalhes do projeto premiado...</p>
                <a href="https://www.alphalumen.ong.br/tbs-2020-revela-projetos-alinhados-com-os-objetivos-da-agenda-2030/" target="_blank" rel="noopener noreferrer" className="link-reportagem">
                  Visualizar Projeto Vencedor
                </a>
              </div>

              <br /><br />

              <h2>Projetos Informais</h2>
              <ul className="lista-projetos">
                <li>Projeto de rifa beneficente</li>
                <li>Projeto de matemática: geometria espacial em 3D (com premiação na escola)</li>
              </ul>
              
              <br /><br />
              
              <h2>Cursos recentes</h2>
              <ul className="lista-projetos">
                <li>Curso de programação web</li>
                <li>Curso Básico concluído in Inglês | 2025</li>
                <li>Curso de Excel Intermediário | 2025</li>
                <li>Curso de Manutenção de Sistemas Elétricos | 2026 (SENAI)</li>
              </ul>
            </div>
          </div>
        );

      case 'privacidade':
        return (
          <div className="conteudo-pagina">
            <div className="intro">
              <h1>Política de Privacidade</h1>
            </div>
            <div className="definição">
              <p>
                Este site é um currículo profissional de Gabriel Soares. Não coletamos, armazenamos 
                ou compartilhamos nenhum dato pessoal dos visitantes. Quaisquer informações de contato 
                fornecidas aqui servem exclusivamente para fins de recrutamento.
              </p>
            </div>
          </div>
        );

      case 'termos':
        return (
          <div className="conteudo-pagina">
            <div className="intro">
              <h1>Termos de Serviço</h1>
            </div>
            <div className="definição">
              <p>
                Todo o conteúdo exibido neste site (textos, imagens e projetos) possui direitos 
                reservados e serve exclusivamente como portfólio profissional de Gabriel Soares. 
                O uso indevido ou cópia não autorizada das informações aqui contidas para fins 
                comerciais não são permitidos.
              </p>
            </div>
          </div>
        );

      default:
        return <h2>Página não encontrada</h2>;
    }
  };

  return (
    <div className="app-container">
      {/* MENU SUPERIOR GLOBAL */}
      <div className="links-nav" style={{ padding: '10px 0', textAlign: 'center' }}>
        <ul>
          <li><button className={paginaAtiva === 'home' ? 'active' : ''} onClick={() => setPaginaAtiva('home')}>Início (Home)</button></li>
          <li><button className={paginaAtiva === 'sobre' ? 'active' : ''} onClick={() => setPaginaAtiva('sobre')}>Sobre mim</button></li>
          <li><button className={paginaAtiva === 'projetos' ? 'active' : ''} onClick={() => setPaginaAtiva('projetos')}>Projetos desenvolvidos</button></li>
          <li><button className={paginaAtiva === 'experiencias' ? 'active' : ''} onClick={() => setPaginaAtiva('experiencias')}>Experiência</button></li>
          <li><button className={paginaAtiva === 'formacao' ? 'active' : ''} onClick={() => setPaginaAtiva('formacao')}>Formação</button></li>
        </ul>
      </div>

      {/* CONTEÚDO DINÂMICO */}
      <main className="main-render">
        {renderConteudo()}
      </main>

      {/* RODAPÉ GLOBAL */}
      <footer>
        <nav>
          <ul>
            <li><button className="link-fake-botao" onClick={() => setPaginaAtiva('privacidade')}>Política de privacidade</button></li>
            <li><button className="link-fake-botao" onClick={() => setPaginaAtiva('termos')}>Termos de serviço</button></li>
            <li><button className="link-fake-botao" onClick={() => setPaginaAtiva('home')}>Voltar ao Menu (home)</button></li>
          </ul>
        </nav>
        <p>&copy; 2026 Gabriel Soares</p>
      </footer>
    </div>
  );
}