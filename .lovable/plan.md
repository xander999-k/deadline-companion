

# Deadline Assistant — Capacitor Mobile App

## Overview
A clean, minimal deadline management app for students. Built as a web app in Lovable, wrapped with Capacitor for native iOS/Android distribution with full local notification support.

## Design System
- Light neutral palette: white background, soft greys (#F5F5F5, #E5E5E5), one subtle accent color (muted blue)
- Large, readable typography (Inter or system font)
- Rounded cards with soft shadows
- Spacious layout with generous whitespace
- Professional, calm, distraction-free aesthetic

## Screens

### 1. Dashboard (Home)
- Header: "Your upcoming deadlines"
- Task cards sorted by nearest due date, each showing: title, due date, countdown ("3 days left"), category badge, subtle urgency indicator
- Floating "+" button to add tasks
- Clean empty state with illustration for first-time users

### 2. Add / Edit Task
- Form fields: title, category (Fee, Assignment, Exam, Attendance, Other), due date picker, optional amount, optional notes
- On save, auto-schedules 4 reminders: 7 days, 3 days, 1 day before, and morning of due date
- Smooth form with validation

### 3. Task Detail
- Full task info with large countdown display
- Reminder schedule preview (list of upcoming notification times)
- Edit and Delete actions (delete with confirmation dialog)

### 4. Reminder Settings
- List of all upcoming reminders across tasks
- Global toggle for notifications on/off
- Per-interval toggles (disable 7-day reminders, etc.)

## Navigation
- Bottom tab navigation: Dashboard, Settings
- Stack navigation within tabs for Add Task and Task Detail screens

## Data & State Management
- All data stored locally using localStorage (will map to AsyncStorage equivalent via Capacitor)
- Zustand for state management
- Clean service layer for task CRUD and notification scheduling

## Notifications (Capacitor)
- Capacitor Local Notifications plugin for scheduling reminders
- Notifications trigger even when app is closed, appear on lock screen with sound/vibration
- Urgency-based reminder text (e.g., "1 day left — fee payment due tomorrow")
- Tapping notification navigates to the relevant task

## Architecture
- Clean folder structure: `/components`, `/pages`, `/services`, `/hooks`, `/utils`, `/types`, `/stores`
- Small, reusable components
- Type-safe with TypeScript throughout
- Prepared extension points for future AI features, cloud sync, and attendance integration

## Capacitor Setup
- Capacitor configured for iOS and Android
- Local Notifications plugin integrated
- User will export to GitHub and build locally with Xcode/Android Studio

## Animations & Polish
- Smooth card entrance animations
- Confirmation dialogs before destructive actions
- Fast, responsive interactions throughout

