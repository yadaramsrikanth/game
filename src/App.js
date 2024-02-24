import {Component} from 'react'

import RulesImage from './components/RulesImage'
import GameView from './components/GameView'

import {
  ResponsiveContainer,
  ScoreHeadingContainer,
  Heading,
  HeadingContainer,
  ScoreContainer,
  ScorePara,
  ScoreValue,
  UnorderedListContainer,
  GameContainer,
  GameImage,
  SeparateContainerGameContainer,
  PersonHeading,
  PlayAgainButton,
  Container,
  GameResultShow,
} from './styledComponents'

import './App.css'

const choicesList = [
  {
    id: 'ROCK',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rock-image.png',
    testid: 'rockButton',
  },
  {
    id: 'SCISSORS',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/scissor-image.png',
    testid: 'paperButton',
  },
  {
    id: 'PAPER',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/paper-image.png',
    testid: 'scissorsButton',
  },
]

class App extends Component {
  state = {
    count: 0,
    gameview: true,
    yourImageUrl: '',
    randomImageUrl: '',
    yourId: '',
    randomId: '',
    matchFinalResult: '',
  }

  renderGameRockPaperScissor = () => {
    return (
      <UnorderedListContainer>
        {choicesList.map(eachChoiceItem => (
          <GameView
            eachChoiceItem={eachChoiceItem}
            key={eachChoiceItem.id}
            renderGame={this.renderGame}
          />
        ))}
      </UnorderedListContainer>
    )
  }

  onClickToReturnGame = () => {
    this.setState({gameview: true})

    console.log(1)
  }

  renderResultBasedOnCondition = () => {
    const {yourId, randomId} = this.state
    if (yourId === randomId) {
      this.setState(prevState => ({
        count: prevState.count,
        matchFinalResult: 'IT IS DRAW',
      }))
    } else if (yourId === 'PAPER' && randomId === 'ROCK') {
      this.setState(prevState => ({
        count: prevState.count + 1,
        matchFinalResult: 'YOU WON',
      }))
    } else if (yourId === 'SCISSORS' && randomId === 'PAPER') {
      this.setState(prevState => ({
        count: prevState.count + 1,
        matchFinalResult: 'YOU WON',
      }))
    } else if (yourId === 'ROCK' && randomId === 'SCISSORS') {
      this.setState(prevState => ({
        count: prevState.count + 1,
        matchFinalResult: 'YOU WON',
      }))
    } else if (yourId === 'SCISSORS' && randomId === 'ROCK') {
      this.setState(prevState => ({
        count: prevState.count - 1,
        matchFinalResult: 'YOU LOSE',
      }))
    } else if (yourId === 'ROCK' && randomId === 'PAPER') {
      this.setState(prevState => ({
        count: prevState.count - 1,
        matchFinalResult: 'YOU LOSE',
      }))
    } else if (yourId === 'PAPER' && randomId === 'SCISSORS') {
      this.setState(prevState => ({
        count: prevState.count - 1,
        matchFinalResult: 'YOU LOSE',
      }))
    }
  }

  renderGameResult = () => {
    const {yourImageUrl, randomImageUrl, matchFinalResult} = this.state

    return (
      <GameContainer>
        <Container>
          <SeparateContainerGameContainer>
            <PersonHeading>YOU</PersonHeading>
            <GameImage src={yourImageUrl} alt="your choice" />
          </SeparateContainerGameContainer>

          <SeparateContainerGameContainer>
            <PersonHeading>OPPONENT</PersonHeading>
            <GameImage src={randomImageUrl} alt="opponent choice" />
          </SeparateContainerGameContainer>
        </Container>
        <GameResultShow>{matchFinalResult} </GameResultShow>

        <PlayAgainButton type="button" onClick={this.onClickToReturnGame}>
          PLAY AGAIN
        </PlayAgainButton>
      </GameContainer>
    )
  }

  renderGame = (id, imageUrl) => {
    this.renderResultBasedOnCondition()
    this.setState({gameview: false})

    const randomInage = choicesList[Math.floor(Math.random() * 2)]
    this.setState({
      yourImageUrl: imageUrl,
      randomImageUrl: randomInage.imageUrl,
      yourId: id,
      randomId: randomInage.id,
    })
  }

  render() {
    const {count, gameview} = this.state
    return (
      <ResponsiveContainer>
        <ScoreHeadingContainer>
          <HeadingContainer>
            <Heading>
              ROCK <br />
              PAPER <br />
              SCISSORS
            </Heading>
          </HeadingContainer>
          <ScoreContainer>
            <ScorePara>Score</ScorePara>
            <ScoreValue>{count}</ScoreValue>
          </ScoreContainer>
        </ScoreHeadingContainer>
        {gameview ? this.renderGameRockPaperScissor() : this.renderGameResult()}
        <RulesImage />
      </ResponsiveContainer>
    )
  }
}

export default App
