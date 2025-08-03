"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { 
  CalendarDays, 
  Clock, 
  Users, 
  Trophy, 
  Info, 
  ArrowRight, 
  UploadCloud,
  Crown,
  Sparkles,
  UserPlus,
  Phone,
  Mail,
  User,
  Plus,
  Eye,
  EyeOff
} from "lucide-react"
import { cn } from "@/lib/utils"

interface TournamentData {
  status: string
  imageUrl?: string
  title: string
  shortDescription: string
  dates: string
  timeRange: string
  numberOfPlayers: number
  price: number
}

interface PlayerFormData {
  fullName: string
  phoneNumber: string
  playerLevel: string
}

interface FormErrors {
  fullName?: string
  phoneNumber?: string
  playerLevel?: string
}

// Tournament Form Component
function TournamentFormSection() {
  const [formData, setFormData] = useState({
    title: "Championnat Hebdomadaire",
    shortDescription: "Tournoi hebdomadaire avec les meilleurs joueurs du Maroc",
    dates: "15–16 Mars 2024",
    timeRange: "20h00 – 00h00",
    numberOfPlayers: 32,
    price: 50,
    status: "Inscriptions Ouvertes",
    imageUrl: "/placeholder.svg?height=200&width=400",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: type === "number" ? Number(value) : value,
    }))
  }

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleSelectChange = (id: string, value: string | number | boolean) => {
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setFormData((prev) => ({
        ...prev,
        imageUrl: URL.createObjectURL(file),
      }))
    }
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8 items-start">
      {/* Form */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Card className="bg-gradient-to-br from-green-900/40 to-green-800/20 border border-green-700/30 backdrop-blur-sm relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/5 via-transparent to-yellow-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <CardHeader className="relative z-10">
            <CardTitle className="text-2xl font-bold text-yellow-400 flex items-center">
              <Trophy className="h-6 w-6 mr-2" />
              Créer Tournoi
            </CardTitle>
            <CardDescription className="text-gray-300">
              Remplissez les détails pour créer une carte de tournoi.
            </CardDescription>
          </CardHeader>

          <CardContent className="grid gap-6 relative z-10">
            <div className="grid gap-2">
              <Label htmlFor="title" className="text-gray-200">Titre</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Championnat Hebdomadaire"
                className="bg-gray-700/50 border-gray-600/50 text-white focus:border-yellow-400 focus:ring-yellow-400/20"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="shortDescription" className="text-gray-200">Description Courte</Label>
              <Textarea
                id="shortDescription"
                value={formData.shortDescription}
                onChange={handleTextareaChange}
                placeholder="Description du tournoi"
                className="bg-gray-700/50 border-gray-600/50 text-white focus:border-yellow-400 focus:ring-yellow-400/20"
                rows={2}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="dates" className="text-gray-200">Date(s)</Label>
                <Input
                  id="dates"
                  value={formData.dates}
                  onChange={handleChange}
                  placeholder="e.g. 15–16 Mars 2024"
                  className="bg-gray-700/50 border-gray-600/50 text-white focus:border-yellow-400 focus:ring-yellow-400/20"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="timeRange" className="text-gray-200">Horaires</Label>
                <Input
                  id="timeRange"
                  value={formData.timeRange}
                  onChange={handleChange}
                  placeholder="e.g. 20h00 – 00h00"
                  className="bg-gray-700/50 border-gray-600/50 text-white focus:border-yellow-400 focus:ring-yellow-400/20"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="numberOfPlayers" className="text-gray-200">Nb Joueurs</Label>
                <Input
                  id="numberOfPlayers"
                  type="number"
                  value={formData.numberOfPlayers}
                  onChange={handleChange}
                  className="bg-gray-700/50 border-gray-600/50 text-white focus:border-yellow-400 focus:ring-yellow-400/20"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="price" className="text-gray-200">Prix (DH)</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  className="bg-gray-700/50 border-gray-600/50 text-white focus:border-yellow-400 focus:ring-yellow-400/20"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="status" className="text-gray-200">Statut</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleSelectChange("status", value)}
              >
                <SelectTrigger className="bg-gray-700/50 border-gray-600/50 text-white focus:border-yellow-400">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600 text-white">
                  <SelectItem value="Inscriptions Ouvertes">Inscriptions Ouvertes</SelectItem>
                  <SelectItem value="Inscriptions Bientôt Fermées">Inscriptions Bientôt Fermées</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="imageUpload" className="text-gray-200">Image du Tournoi</Label>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="imageUpload"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-600/50 border-dashed rounded-lg cursor-pointer bg-gray-700/30 hover:bg-gray-700/50 transition-colors duration-200"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <UploadCloud className="w-8 h-8 mb-3 text-yellow-400" />
                    <p className="mb-2 text-sm text-gray-300">
                      <span className="font-semibold text-yellow-400">Cliquez pour télécharger</span>
                    </p>
                    <p className="text-xs text-gray-400">PNG, JPG, GIF (MAX. 800x400px)</p>
                  </div>
                  <Input id="imageUpload" type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
                </label>
              </div>
              {formData.imageUrl && (
                <div className="mt-4">
                  <p className="text-sm text-gray-300 mb-2">Aperçu de l&apos;image :</p>
                  <img
                    src={formData.imageUrl}
                    alt="Aperçu"
                    className="w-full h-auto max-h-48 object-cover rounded-md border border-yellow-400/30"
                  />
                </div>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex justify-end relative z-10">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-300 hover:to-yellow-500 text-black font-bold">
                <Plus className="h-4 w-4 mr-2" />
                Créer Tournoi
              </Button>
            </motion.div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}

// Player Registration Component
function PlayerRegistrationSection() {
  const [formData, setFormData] = useState<PlayerFormData>({
    fullName: "",
    phoneNumber: "",
    playerLevel: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validate = () => {
    const newErrors: FormErrors = {}
    if (!formData.fullName) newErrors.fullName = "Le nom complet est requis."
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Le numéro de téléphone est requis."
    } else if (!/^(06|07)\d{8}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Format de téléphone marocain invalide (ex: 06XXXXXXXX ou 07XXXXXXXX)."
    }
   
    if (!formData.playerLevel) newErrors.playerLevel = "Veuillez sélectionner votre niveau."

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, files } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: type === "file" ? (files?.[0] || null) : value,
    }))
  }

  const handleSelectChange = (name: keyof PlayerFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (validate()) {
      setIsSubmitted(true)
      console.log("Form Data Submitted:", formData)
    }
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md mx-auto bg-gradient-to-br from-green-900/40 to-green-800/20 border border-green-700/30 backdrop-blur-sm relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/5 via-transparent to-yellow-400/5 opacity-100" />
          
          <CardHeader className="text-center relative z-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="flex justify-center mb-4"
            >
              <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full p-4">
                <Trophy className="h-8 w-8 text-black" />
              </div>
            </motion.div>
            <CardTitle className="text-3xl font-bold text-yellow-400">
              🎱 Inscription réussie !
            </CardTitle>
            <CardDescription className="text-gray-300">
              Nous vous contacterons bientôt.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 relative z-10">
            <h3 className="text-xl font-semibold text-gray-200">Récapitulatif :</h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex justify-between items-center p-2 rounded bg-gray-800/50">
                <span className="font-medium text-yellow-400">Nom :</span>
                <span>{formData.fullName}</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded bg-gray-800/50">
                <span className="font-medium text-yellow-400">Téléphone :</span>
                <span>{formData.phoneNumber}</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded bg-gray-800/50">
                <span className="font-medium text-yellow-400">Niveau :</span>
                <span>{formData.playerLevel}</span>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-center relative z-10">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => setIsSubmitted(false)}
                className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-300 hover:to-yellow-500 text-black font-bold rounded-full px-8 py-2"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Inscrire un autre joueur
              </Button>
            </motion.div>
          </CardFooter>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Card className="w-full max-w-lg mx-auto bg-gradient-to-br from-green-900/40 to-green-800/20 border border-green-700/30 backdrop-blur-sm relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/5 via-transparent to-yellow-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <CardHeader className="text-center relative z-10">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="flex justify-center mb-4"
          >
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full p-3">
              <UserPlus className="h-6 w-6 text-black" />
            </div>
          </motion.div>
          <CardTitle className="text-3xl font-bold text-yellow-400">
            Inscription Joueur
          </CardTitle>
          <CardDescription className="text-gray-300">
            Remplissez le formulaire pour inscrire un joueur.
          </CardDescription>
        </CardHeader>

        <CardContent className="relative z-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-gray-200">
                Nom Complet <span className="text-red-400">*</span>
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-400" size={20} />
                <Input
                  id="fullName"
                  placeholder="Nom complet du joueur"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={cn(
                    "pl-10 bg-gray-700/50 border-gray-600/50 text-white focus:border-yellow-400 focus:ring-yellow-400/20",
                    errors.fullName && "border-red-400",
                  )}
                />
              </div>
              {errors.fullName && <p className="text-sm text-red-400">{errors.fullName}</p>}
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <Label htmlFor="phoneNumber" className="text-gray-200">
                Numéro de Téléphone <span className="text-red-400">*</span>
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-400" size={20} />
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder="Ex: 06XXXXXXXX"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className={cn(
                    "pl-10 bg-gray-700/50 border-gray-600/50 text-white focus:border-yellow-400 focus:ring-yellow-400/20",
                    errors.phoneNumber && "border-red-400",
                  )}
                />
              </div>
              {errors.phoneNumber && <p className="text-sm text-red-400">{errors.phoneNumber}</p>}
            </div>
            
            {/* Player Level */}
            <div className="space-y-2">
              <Label htmlFor="playerLevel" className="text-gray-200">
                Niveau de Joueur <span className="text-red-400">*</span>
              </Label>
              <RadioGroup
                value={formData.playerLevel}
                onValueChange={(value) => handleSelectChange("playerLevel", value)}
                className={cn(
                  "grid grid-cols-2 gap-4",
                  errors.playerLevel && "border border-red-400 p-2 rounded-md",
                )}
              >
                {["Débutant", "Intermédiaire", "Avancé", "Professionnel"].map((level) => (
                  <div key={level} className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={level}
                      id={`level-${level}`}
                      className="text-yellow-400 border-gray-500 data-[state=checked]:bg-yellow-400 data-[state=checked]:text-black"
                    />
                    <Label htmlFor={`level-${level}`} className="text-gray-300">
                      {level}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              {errors.playerLevel && <p className="text-sm text-red-400">{errors.playerLevel}</p>}
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-300 hover:to-yellow-500 text-black font-bold rounded-full px-8 py-3 text-lg transition-all duration-300"
              >
                <UserPlus className="h-5 w-5 mr-2" />
                S&apos;inscrire au Tournoi
              </Button>
            </motion.div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Main Admin Dashboard Component
export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("tournament")
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const FloatingParticles = () => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-yellow-400/20 rounded-full"
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 4 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
      {/* Animated Background */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 215, 0, 0.15) 0%, transparent 50%)`,
            transition: 'background-image 0.3s ease',
          }} 
        />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,215,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,215,0,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <FloatingParticles />

      

      {/* Navigation Tabs */}
      <motion.div
        className="relative z-40 bg-black/30 backdrop-blur-sm border-b border-green-700/30"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: "tournament", label: "Gestion Tournois", icon: Trophy },
              { id: "players", label: "Inscription Joueurs", icon: UserPlus },
            ].map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className={cn(
                  "flex items-center space-x-2 py-4 px-6 border-b-2 transition-all duration-300 relative group",
                  activeSection === tab.id
                    ? "border-yellow-400 text-yellow-400"
                    : "border-transparent text-gray-400 hover:text-yellow-400 hover:border-yellow-400/50"
                )}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                <tab.icon className="h-5 w-5" />
                <span className="font-medium">{tab.label}</span>
                {activeSection === tab.id && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-400"
                    layoutId="activeTab"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                <motion.div
                  className="absolute inset-0 bg-yellow-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"
                />
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <main className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {activeSection === "tournament" && (
              <motion.div
                key="tournament"
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.6 }}
              >
                <div className="mb-8">
                  <motion.h2
                    className="text-3xl font-bold text-yellow-400 mb-4 flex items-center"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Trophy className="h-8 w-8 mr-3" />
                    Gestion des Tournois
                    <motion.div
                      className="ml-4 h-8 w-1 bg-gradient-to-b from-yellow-400 to-transparent"
                      initial={{ height: 0 }}
                      animate={{ height: 32 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                    />
                  </motion.h2>
                  <p className="text-gray-300 text-lg">Créez et gérez vos tournois de billard avec des aperçus en temps réel.</p>
                </div>
                {!isCollapsed && <TournamentFormSection />}
              </motion.div>
            )}

            {activeSection === "players" && (
              <motion.div
                key="players"
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.6 }}
              >
                <div className="mb-8">
                  <motion.h2
                    className="text-3xl font-bold text-yellow-400 mb-4 flex items-center"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <UserPlus className="h-8 w-8 mr-3" />
                    Inscription des Joueurs
                    <motion.div
                      className="ml-4 h-8 w-1 bg-gradient-to-b from-yellow-400 to-transparent"
                      initial={{ height: 0 }}
                      animate={{ height: 32 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                    />
                  </motion.h2>
                  <p className="text-gray-300 text-lg">Gérez les inscriptions des joueurs pour vos tournois.</p>
                </div>
                {!isCollapsed && <PlayerRegistrationSection />}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Footer */}
      <motion.footer
        className="relative z-10 mt-20 border-t border-green-700/30 bg-black/30 backdrop-blur-sm"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Sparkles className="h-6 w-6 text-yellow-400" />
              <span className="text-xl font-bold text-yellow-400">Pocket Club</span>
              <Sparkles className="h-6 w-6 text-yellow-400" />
            </div>
            <p className="text-gray-400">
              © 2024 Pocket Club. Panneau d&apos;administration - Gérez vos tournois avec style.
            </p>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}