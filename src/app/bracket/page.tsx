"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Shuffle, RotateCcw, Play, Edit3, Check, Trophy, Crown, Users } from "lucide-react"

interface Player {
  id: number
  name: string
}

interface Match {
  id: string
  player1: Player | null
  player2: Player | null
  winner: Player | null
  round: number
  position: number
  side: "left" | "right" | "final"
}

export default function TournamentBracket() {
  const [players, setPlayers] = useState<Player[]>([])
  const [matches, setMatches] = useState<Match[]>([])
  const [tournamentStarted, setTournamentStarted] = useState(false)
  const [champion, setChampion] = useState<Player | null>(null)
  const [editingPlayer, setEditingPlayer] = useState<number | null>(null)
  const [editName, setEditName] = useState("")
  const [showConfetti, setShowConfetti] = useState(false)

  // Initialize 32 players
  useEffect(() => {
    const initialPlayers = Array.from({ length: 32 }, (_, i) => ({
      id: i + 1,
      name: `Player ${i + 1}`,
    }))
    setPlayers(initialPlayers)
  }, [])

  const shufflePlayers = () => {
    if (tournamentStarted) return
    const shuffled = [...players].sort(() => Math.random() - 0.5)
    setPlayers(shuffled)
  }

  const startTournament = () => {
    const initialMatches: Match[] = []

    // Left side bracket (8 first round matches - 16 players)
    for (let i = 0; i < 8; i++) {
      initialMatches.push({
        id: `l-r1-m${i + 1}`,
        player1: players[i * 2],
        player2: players[i * 2 + 1],
        winner: null,
        round: 1,
        position: i,
        side: "left",
      })
    }

    // Left side subsequent rounds
    for (let round = 2; round <= 4; round++) {
      const matchCount = Math.pow(2, 4 - round)
      for (let i = 0; i < matchCount; i++) {
        initialMatches.push({
          id: `l-r${round}-m${i + 1}`,
          player1: null,
          player2: null,
          winner: null,
          round,
          position: i,
          side: "left",
        })
      }
    }

    // Right side bracket (8 first round matches - 16 players)
    for (let i = 0; i < 8; i++) {
      initialMatches.push({
        id: `r-r1-m${i + 1}`,
        player1: players[16 + i * 2],
        player2: players[17 + i * 2],
        winner: null,
        round: 1,
        position: i,
        side: "right",
      })
    }

    // Right side subsequent rounds
    for (let round = 2; round <= 4; round++) {
      const matchCount = Math.pow(2, 4 - round)
      for (let i = 0; i < matchCount; i++) {
        initialMatches.push({
          id: `r-r${round}-m${i + 1}`,
          player1: null,
          player2: null,
          winner: null,
          round,
          position: i,
          side: "right",
        })
      }
    }

    // Final match
    initialMatches.push({
      id: "final",
      player1: null,
      player2: null,
      winner: null,
      round: 5,
      position: 0,
      side: "final",
    })

    setMatches(initialMatches)
    setTournamentStarted(true)
    setChampion(null)
  }

  const selectWinner = (matchId: string, winner: Player) => {
    const updatedMatches = [...matches]
    const matchIndex = updatedMatches.findIndex((m) => m.id === matchId)
    
    if (matchIndex === -1) return

    // Update the current match with the winner
    updatedMatches[matchIndex] = { ...updatedMatches[matchIndex], winner }

    const currentMatch = updatedMatches[matchIndex]

    if (currentMatch.side === "final") {
      setChampion(winner)
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 3000)
    } else if (currentMatch.round < 4) {
      // Regular advancement within left/right sides
      const nextRound = currentMatch.round + 1
      const nextPosition = Math.floor(currentMatch.position / 2)
      const nextMatchIndex = updatedMatches.findIndex(
        (m) => m.round === nextRound && m.position === nextPosition && m.side === currentMatch.side
      )

      if (nextMatchIndex !== -1) {
        const nextMatch = { ...updatedMatches[nextMatchIndex] }
        if (currentMatch.position % 2 === 0) {
          nextMatch.player1 = winner
        } else {
          nextMatch.player2 = winner
        }
        updatedMatches[nextMatchIndex] = nextMatch
      }
    } else if (currentMatch.round === 4) {
      // Semi-final advancement to final - THIS IS THE FIX
      const finalMatchIndex = updatedMatches.findIndex((m) => m.side === "final")
      if (finalMatchIndex !== -1) {
        const finalMatch = { ...updatedMatches[finalMatchIndex] }
        if (currentMatch.side === "left") {
          finalMatch.player1 = winner
        } else if (currentMatch.side === "right") {
          finalMatch.player2 = winner
        }
        updatedMatches[finalMatchIndex] = finalMatch
      }
    }

    setMatches(updatedMatches)
  }

  const resetTournament = () => {
    setMatches([])
    setTournamentStarted(false)
    setChampion(null)
    setShowConfetti(false)
    const initialPlayers = Array.from({ length: 32 }, (_, i) => ({
      id: i + 1,
      name: `Player ${i + 1}`,
    }))
    setPlayers(initialPlayers)
  }

  const updatePlayerName = (playerId: number, newName: string) => {
    setPlayers(players.map((p) => (p.id === playerId ? { ...p, name: newName } : p)))
    setEditingPlayer(null)
  }

  const MatchBox = ({ match, className = "" }: { match: Match; className?: string }) => (
    <div className={`bg-gradient-to-br from-green-900/60 to-green-800/40 border-2 border-green-700/50 rounded-lg shadow-lg backdrop-blur-sm relative ${className}`}>
      <div className="p-2 space-y-1">
        <div className={`text-xs p-1.5 border-b border-green-600/30 rounded transition-all duration-300 ${
          match.winner?.id === match.player1?.id 
            ? "bg-gradient-to-r from-yellow-400/20 to-yellow-500/10 text-yellow-100 font-bold border-yellow-400/50" 
            : "text-gray-300"
        }`}>
          {match.player1?.name || "TBD"}
        </div>
        <div className={`text-xs p-1.5 rounded transition-all duration-300 ${
          match.winner?.id === match.player2?.id 
            ? "bg-gradient-to-r from-yellow-400/20 to-yellow-500/10 text-yellow-100 font-bold border border-yellow-400/50" 
            : "text-gray-300"
        }`}>
          {match.player2?.name || "TBD"}
        </div>
      </div>

      {match.player1 && match.player2 && (
        <div className="p-1 border-t border-green-600/30">
          <Select
            value={match.winner ? (match.winner.id === match.player1.id ? "player1" : "player2") : ""}
            onValueChange={(value) => {
              const winner = value === "player1" ? match.player1! : match.player2!
              selectWinner(match.id, winner)
            }}
          >
            <SelectTrigger className="h-6 text-xs bg-gradient-to-r from-green-800/50 to-green-700/50 border-green-600/50 text-gray-300">
              <SelectValue placeholder="Winner" />
            </SelectTrigger>
            <SelectContent className="bg-green-900/90 border-green-700/50">
              <SelectItem value="player1" className="text-gray-300 hover:text-white hover:bg-green-800/50 text-xs">
                {match.player1.name}
              </SelectItem>
              <SelectItem value="player2" className="text-gray-300 hover:text-white hover:bg-green-800/50 text-xs">
                {match.player2.name}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  )

  const getMatchesForRoundAndSide = (round: number, side: "left" | "right") => {
    return matches.filter((m) => m.round === round && m.side === side).sort((a, b) => a.position - b.position)
  }

  const BracketSide = ({ side }: { side: "left" | "right" }) => {
    const isLeft = side === "left"

    return (
      <div className="flex-1">
        <div className="relative h-[900px]">
          {/* Round 1 - 8 matches */}
          <div className={`absolute top-0 ${isLeft ? 'left-0' : 'right-0'} flex flex-col space-y-8`}>
            {getMatchesForRoundAndSide(1, side).map((match, index) => (
              <MatchBox key={match.id} match={match} className="w-32" />
            ))}
          </div>

          {/* Round 2 - 4 matches */}
          <div className={`absolute top-26 ${isLeft ? 'left-40' : 'right-40'} flex flex-col space-y-60`}>
            {getMatchesForRoundAndSide(2, side).map((match, index) => (
              <MatchBox key={match.id} match={match} className="w-32" />
            ))}
          </div>

          {/* Round 3 - 2 matches */}
          <div className={`absolute top-64 ${isLeft ? 'left-80' : 'right-80'} flex flex-col space-y-64`}>
            {getMatchesForRoundAndSide(3, side).map((match, index) => (
              <MatchBox key={match.id} match={match} className="w-32" />
            ))}
          </div>

          {/* Round 4 - 1 match */}
          <div className={`absolute top-96 ${isLeft ? 'left-120' : 'right-120'} flex flex-col`}>
            {getMatchesForRoundAndSide(4, side).map((match, index) => (
              <MatchBox key={match.id} match={match} className="w-32" />
            ))}
          </div>

          {/* Round 5 - Semi-final */}
          <div className={`absolute top-96 ${isLeft ? 'left-160' : 'right-160'} flex flex-col`}>
            {getMatchesForRoundAndSide(5, side).map((match, index) => (
              <MatchBox key={match.id} match={match} className="w-32" />
            ))}
          </div>

          {/* Connecting lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" style={{ zIndex: -1 }}>
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Round 1 to Round 2 connections */}
            {[0,1,2,3].map((pairIndex) => {
              const match1Y = 64 + (pairIndex * 2) * 96 + 32  // First match in pair
              const match2Y = 64 + (pairIndex * 2 + 1) * 96 + 32  // Second match in pair
              const nextY = 96 + pairIndex * 160 + 32  // Next round match
              
              const startX = isLeft ? 128 : 0
              const midX = isLeft ? 148 : -20
              const endX = isLeft ? 160 : -32
              
              return (
                <g key={`r1-r2-${pairIndex}`}>
                  <line x1={startX} y1={match1Y} x2={midX} y2={match1Y} stroke="#10b981" strokeWidth="2" />
                  <line x1={startX} y1={match2Y} x2={midX} y2={match2Y} stroke="#10b981" strokeWidth="2" />
                  <line x1={midX} y1={match1Y} x2={midX} y2={match2Y} stroke="#10b981" strokeWidth="2" />
                  <line x1={midX} y1={(match1Y + match2Y) / 2} x2={endX} y2={nextY} stroke="#fbbf24" strokeWidth="2" />
                </g>
              )
            })}

            {/* Round 2 to Round 3 connections */}
            {[0,1].map((pairIndex) => {
              const match1Y = 96 + pairIndex * 2 * 160 + 32
              const match2Y = 96 + (pairIndex * 2 + 1) * 160 + 32
              const nextY = 224 + pairIndex * 352 + 32
              
              const startX = isLeft ? 168 : -32
              const midX = isLeft ? 188 : -52
              const endX = isLeft ? 200 : -64
              
              return (
                <g key={`r2-r3-${pairIndex}`}>
                  <line x1={startX} y1={match1Y} x2={midX} y2={match1Y} stroke="#10b981" strokeWidth="2" />
                  <line x1={startX} y1={match2Y} x2={midX} y2={match2Y} stroke="#10b981" strokeWidth="2" />
                  <line x1={midX} y1={match1Y} x2={midX} y2={match2Y} stroke="#10b981" strokeWidth="2" />
                  <line x1={midX} y1={(match1Y + match2Y) / 2} x2={endX} y2={nextY} stroke="#fbbf24" strokeWidth="2" />
                </g>
              )
            })}

            {/* Round 3 to Round 4 connections */}
            {(() => {
              const match1Y = 224 + 32
              const match2Y = 576 + 32
              const nextY = 352 + 32
              
              const startX = isLeft ? 208 : -64
              const midX = isLeft ? 228 : -84
              const endX = isLeft ? 240 : -96
              
              return (
                <g key="r3-r4">
                  <line x1={startX} y1={match1Y} x2={midX} y2={match1Y} stroke="#10b981" strokeWidth="2" />
                  <line x1={startX} y1={match2Y} x2={midX} y2={match2Y} stroke="#10b981" strokeWidth="2" />
                  <line x1={midX} y1={match1Y} x2={midX} y2={match2Y} stroke="#10b981" strokeWidth="2" />
                  <line x1={midX} y1={(match1Y + match2Y) / 2} x2={endX} y2={nextY} stroke="#fbbf24" strokeWidth="2" />
                </g>
              )
            })()}

            {/* Round 4 to Final connections */}
            {(() => {
              const startY = 352 + 32
              const endY = 416 + 32
              
              const startX = isLeft ? 248 : -96
              const endX = isLeft ? 288 : -128
              
              return (
                <line key="r4-final" x1={startX} y1={startY} x2={endX} y2={endY} stroke="#fbbf24" strokeWidth="2" />
              )
            })()}
          </svg>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Confetti Effect */}
      <AnimatePresence>
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl"
                initial={{ 
                  x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
                  y: -50,
                  rotate: 0
                }}
                animate={{ 
                  y: (typeof window !== 'undefined' ? window.innerHeight : 800) + 50,
                  rotate: 360
                }}
                transition={{
                  duration: 3,
                  delay: Math.random() * 2,
                  ease: "easeOut"
                }}
              >
                🏆
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      <div className="max-w-full mx-auto p-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Trophy className="h-12 w-12 text-yellow-400 mr-2" />
            <Crown className="h-16 w-16 text-yellow-500" />
            <Trophy className="h-12 w-12 text-yellow-400 ml-2" />
          </div>

          <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
            32 Team Single Elimination
          </h1>

          <div className="flex flex-wrap justify-center gap-4">
            {!tournamentStarted && (
              <>
                <Button 
                  onClick={shufflePlayers} 
                  className="bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-2 rounded"
                >
                  <Shuffle className="w-4 h-4 mr-2" />
                  Shuffle
                </Button>

                <Button 
                  onClick={startTournament} 
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-4 py-2 rounded"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Start
                </Button>
              </>
            )}
            
            <Button 
              onClick={resetTournament} 
              className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>

        {/* Champion Section */}
        {champion && (
          <div className="text-center mb-8 p-6 bg-gradient-to-r from-yellow-400/20 to-yellow-500/20 rounded-xl border-2 border-yellow-400/50">
            <Crown className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-yellow-400 mb-2">CHAMPION</h2>
            <p className="text-xl font-bold text-white">{champion.name}</p>
          </div>
        )}

        {/* Player List */}
        {!tournamentStarted && (
          <div className="mb-8">
            <div className="flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-yellow-400 mr-2" />
              <h2 className="text-xl font-bold text-yellow-400">Tournament Players</h2>
            </div>
            
            <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
              {players.map((player) => (
                <div 
                  key={player.id} 
                  className="bg-green-900/60 p-2 rounded border border-green-700/50 hover:border-yellow-400/70 transition-all"
                >
                  {editingPlayer === player.id ? (
                    <div className="flex gap-1">
                      <Input
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="text-xs h-6 bg-green-800/50 border-green-600/50 text-white"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            updatePlayerName(player.id, editName)
                          }
                        }}
                      />
                      <Button 
                        size="sm" 
                        onClick={() => updatePlayerName(player.id, editName)} 
                        className="h-6 w-6 p-0 bg-yellow-400 hover:bg-yellow-500 text-black"
                      >
                        <Check className="w-3 h-3" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300 text-xs truncate">
                        {player.name}
                      </span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setEditingPlayer(player.id)
                          setEditName(player.name)
                        }}
                        className="h-4 w-4 p-0 hover:bg-yellow-400/20 text-gray-400 hover:text-yellow-400"
                      >
                        <Edit3 className="w-2 h-2" />
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tournament Bracket */}
        {tournamentStarted && (
          <div className="bg-gradient-to-br from-green-950/50 to-black/80 p-4 rounded-xl border border-green-700/30 overflow-x-auto">
            <div className="flex items-center justify-center min-w-[1200px]" style={{ height: '900px' }}>
              <BracketSide side="left" />

              {/* Center Final */}
              <div className="flex flex-col items-center justify-center px-8">
                <div className="text-center space-y-4">
                  <Trophy className="h-12 w-12 text-yellow-500 mx-auto" />
                  <h3 className="text-2xl font-bold text-yellow-400">FINAL</h3>
                  
                  {matches.find((m) => m.side === "final") && (
                    <div className="relative">
                      <MatchBox match={matches.find((m) => m.side === "final")!} className="w-40" />
                      
                      {/* Lines to final */}
                      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: -2 }}>
                        <line x1={-60} y1={32} x2={0} y2={32} stroke="#fbbf24" strokeWidth="3" />
                        <line x1={160} y1={32} x2={220} y2={32} stroke="#fbbf24" strokeWidth="3" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>

              <BracketSide side="right" />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}