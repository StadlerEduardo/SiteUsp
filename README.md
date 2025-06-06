# 🎮 USP Gamificada

<div align="center">
  <img src="https://img.shields.io/badge/Status-Ativo-brightgreen" alt="Status">
  <img src="https://img.shields.io/badge/Versão-1.0.0-blue" alt="Versão">
  <img src="https://img.shields.io/badge/Licença-MIT-yellow" alt="Licença">
  <img src="https://img.shields.io/badge/Tecnologia-HTML%20%7C%20CSS%20%7C%20JavaScript-orange" alt="Tecnologias">
</div>

<div align="center">
  <h3>🏛️ Explore, Aprenda e Conquiste na Maior Universidade do Brasil</h3>
  <p>Uma experiência gamificada interativa para descobrir tudo sobre a Universidade de São Paulo</p>
</div>

---

## 📋 Sobre o Projeto

**USP Gamificada** é uma plataforma educacional interativa que transforma o aprendizado sobre a Universidade de São Paulo em uma experiência envolvente e divertida. Através de elementos de gamificação, os usuários podem explorar a história, estrutura e curiosidades da USP enquanto ganham XP, desbloqueiam conquistas e completam missões.

### 🎯 Objetivo

Tornar o conhecimento sobre a USP mais acessível e interessante, especialmente para novos estudantes, visitantes e pessoas interessadas em conhecer melhor esta instituição centenária.

## ✨ Funcionalidades Principais

### 🏠 **Dashboard Principal**
- Sistema de níveis e XP
- Progresso visual do usuário
- Conquistas e badges desbloqueáveis
- Missões ativas e desafios diários
- Estatísticas em tempo real da USP

### 🧠 **Quiz Interativo**
- **5 perguntas** sobre história e estrutura da USP
- **Sistema de pontuação** com multiplicadores
- **Timer de 30 segundos** por questão
- **Explicações detalhadas** para cada resposta
- **Sequência de acertos** com bônus
- **Resultados completos** com estatísticas de performance

### 🗺️ **Tour Virtual 360°**
- **Mapa interativo** do campus
- **5 pontos de interesse** principais:
  - 🏛️ Reitoria
  - 📚 Biblioteca Central
  - 🎨 Museu de Arte
  - 🔬 Complexo de Laboratórios
  - ⏰ Praça do Relógio
- **Visualização 360°** de cada local
- **Curiosidades e fatos** históricos
- **Sistema de progresso** com XP por visita

### 🎮 **Sistema de Gamificação**
- **Níveis de usuário** baseados em XP
- **Badges e conquistas** temáticas
- **Missões e desafios** diários
- **Ranking e competição** entre usuários
- **Loja de recompensas** para trocar XP

## 🛠️ Tecnologias Utilizadas

### Frontend
- **HTML5** - Estrutura semântica
- **CSS3** - Estilos modernos com gradientes e animações
- **JavaScript ES6+** - Lógica interativa e gamificação
- **Font Awesome** - Ícones
- **Google Fonts (Inter)** - Tipografia

### Recursos Visuais
- **Design Responsivo** - Adaptável a todos os dispositivos
- **Animações CSS** - Transições suaves e efeitos visuais
- **Sistema de Partículas** - Efeitos de fundo dinâmicos
- **Gradientes Modernos** - Visual atrativo e contemporâneo

### Funcionalidades Avançadas
- **LocalStorage** - Persistência de progresso
- **Web Audio API** - Efeitos sonoros
- **Fullscreen API** - Modo tela cheia
- **Responsive Design** - Mobile-first

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Servidor web local (opcional, mas recomendado)

### Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/usp-gamificada.git
cd usp-gamificada
```

2. **Opção 1: Servidor Local Simples**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (se tiver o http-server instalado)
npx http-server
```

3. **Opção 2: Live Server (VS Code)**
- Instale a extensão "Live Server"
- Clique com botão direito em `index.html`
- Selecione "Open with Live Server"

4. **Acesse no navegador**
```
http://localhost:8000
```

## 📱 Como Usar

### 1. **Página Inicial**
- Visualize suas estatísticas de progresso
- Explore as conquistas disponíveis
- Aceite missões e desafios
- Navegue pelos diferentes módulos

### 2. **Quiz Interativo**
- Clique em "Quiz Interativo" na página inicial
- Responda as 5 perguntas sobre a USP
- Ganhe XP baseado na precisão e velocidade
- Veja explicações detalhadas das respostas

### 3. **Tour Virtual**
- Acesse "Tour Virtual 360°"
- Clique nos pontos do mapa para explorar
- Colete XP visitando cada local
- Aprenda curiosidades sobre cada ponto

### 4. **Sistema de Progresso**
- Ganhe XP completando atividades
- Desbloqueie badges e conquistas
- Suba de nível conforme progride
- Complete missões para bônus extras

## 📊 Estrutura do Projeto

```
usp-gamificada/
├── index.html              # Página principal
├── quiz.html               # Sistema de quiz
├── tour.html               # Tour virtual
├── styles.css              # Estilos principais
├── script.js               # JavaScript principal
├── quiz.js                 # Lógica do quiz
├── tour.js                 # Lógica do tour
├── package.json            # Dependências (Next.js)
├── README.md               # Documentação
└── assets/                 # Imagens e recursos
    ├── images/
    └── icons/
```

## 🎨 Design e UX

### Paleta de Cores
- **Primária**: Gradiente azul-roxo (#667eea → #764ba2)
- **Secundária**: Verde (#10b981), Amarelo (#f59e0b)
- **Neutros**: Cinzas (#333, #666, #f8f9fa)

### Tipografia
- **Fonte Principal**: Inter (Google Fonts)
- **Pesos**: 300, 400, 500, 600, 700, 800

### Componentes
- Cards com sombras suaves
- Botões com hover effects
- Barras de progresso animadas
- Modais responsivos
- Sistema de notificações

## 📈 Estatísticas da USP

O projeto inclui dados reais sobre a USP:
- **183 cursos** oferecidos
- **90.000+ alunos** matriculados
- **42 unidades** distribuídas
- **Top 100** ranking mundial
- **7 campi** no estado de São Paulo

## 🏆 Sistema de Conquistas

### Badges Disponíveis
- 🧠 **Primeiro Quiz** - Complete seu primeiro quiz
- 🗺️ **Explorador** - Visite 3 pontos no tour virtual
- 📚 **Buscador do Conhecimento** - Acerte 80% das questões
- 🔥 **Mestre da Sequência** - Mantenha sequência de 5 acertos
- 👑 **Expert USP** - Complete todas as atividades

### Sistema de XP
- **Quiz**: 30-60 XP por questão
- **Tour Virtual**: 30-70 XP por local
- **Missões**: 100-200 XP por missão
- **Desafios Diários**: 100 XP + bônus

## 🔧 Funcionalidades Técnicas

### Persistência de Dados
- Progresso salvo no LocalStorage
- Configurações de usuário persistentes
- Histórico de conquistas

### Responsividade
- Design mobile-first
- Breakpoints: 480px, 768px, 1024px
- Layout adaptativo para tablets e desktops

### Performance
- Carregamento otimizado de imagens
- CSS e JS minificados
- Lazy loading para recursos pesados

## 🤝 Contribuindo

Contribuições são sempre bem-vindas! Para contribuir:

1. **Fork** o projeto
2. Crie uma **branch** para sua feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. **Push** para a branch (`git push origin feature/AmazingFeature`)
5. Abra um **Pull Request**

### Ideias para Contribuições
- 🎯 Novos tipos de quiz (múltipla escolha, verdadeiro/falso)
- 🗺️ Mais pontos no tour virtual
- 🏆 Sistema de ranking online
- 📱 Versão mobile nativa
- 🌐 Internacionalização (inglês/espanhol)
- 🔊 Narração em áudio
- 📊 Dashboard de analytics

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Autores

- **Seu Nome** - *Desenvolvimento inicial* - [@seu-usuario](https://github.com/seu-usuario)

## 🙏 Agradecimentos

- **Universidade de São Paulo** - Pela inspiração e dados
- **Comunidade Open Source** - Pelas ferramentas e bibliotecas
- **Font Awesome** - Pelos ícones
- **Google Fonts** - Pela tipografia

## 📞 Contato

- **Email**: seu.email@exemplo.com
- **LinkedIn**: [Seu Perfil](https://linkedin.com/in/seu-perfil)
- **Portfolio**: [seu-portfolio.com](https://seu-portfolio.com)

---

<div align="center">
  <p>Feito com ❤️ para a comunidade USP</p>
  <p>⭐ Se este projeto te ajudou, considere dar uma estrela!</p>
</div>
```

Este README inclui todas as informações essenciais sobre seu projeto USP Gamificada, com:

- **Descrição completa** do projeto e objetivos
- **Lista detalhada** de todas as funcionalidades
- **Instruções claras** de instalação e uso
- **Documentação técnica** da estrutura
- **Informações de design** e UX
- **Sistema de gamificação** explicado
- **Guia de contribuição** para outros desenvolvedores
- **Formatação profissional** com badges e emojis