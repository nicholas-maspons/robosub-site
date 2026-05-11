# How to View Website

1. Open a terminal and navigate to where you want the project saved
2. git clone https://github.com/nicholas-maspons/robosub-site.git
3. In the Terminal: cd into the subfolder that is now present "cd robosub-site"
4. In the Terminal: npm run dev -- --host     
  - The Meta headset is connected to the "nyu" WiFi, and --host allows people on the same WiFi to view this locally hosted website by visiting the URL seen in the terminal after running this command. You will see "Local: http://..." and "Network: http://..."
  In short: use the Network URL, not the local
5. Type the Network URL and you will now be able to view the website

## Testing AR

AR requires HTTPS so the regular Network URL will not work for AR. Thats why ngrok is being used here

**One-time setup:**
1. `brew install ngrok`
2. Sign up at dashboard.ngrok.com and get your authtoken
3. `ngrok config add-authtoken YOUR_TOKEN` — this can be run from any terminal, it is a global command

**Every session:**
1. `npm run dev -- --host` in one terminal
2. `ngrok http 5173` in a second terminal
3. Copy the `https://` URL ngrok gives you

## Notes: 
- The headset is connected to the "nyu" WiFi using my [Nicholas Maspons'] credentials. This will have to be changed at some point. In the coming weeks.
- The headset is connected to my account using the Meta Horizon app, but this will also need to be changed eventually. Doesn't really matter for now.
- If someone reconnects to the "nyu" WiFi using someone else's credentials, you will be asked for:
1. EAP Method: Select PEAP
2. Phase 2 Identification: Select MSCHAPV2
3. CA Certificate: Use system certs
4. Domain: I put nyu.edu
5. Identity: [your username for "nyu" WiFi"]
6. Password: [the password] On iPhone (maybe other phones also), you can find your username and password in settings when you click on the "nyu" WiFi info icon

---

# NYU AUViolets Website

Built with React + TypeScript + Vite. No backend, no database — fully static.

## Current State

- Site with 3D model viewer and partially completed game based on [RoboSub competition tasks](https://robonation.gitbook.io/robosub-resources/section-3-autonomy-challenge/3.2-task-descriptions). Other pages not complete.
- **Kelpie 3D Anatomy Explorer** — interactive 3D model of Kelpie with clickable hotspots for each component.
- **AR support** — "View in AR" button on the anatomy page. Works on Android. But not on Meta Quest 3.
- **AUV Mission Game** — educational game reflecting the real RoboSub competition tasks that Kelpie currently has implemented (Tasks 1, 2, 4, 6: Gate, Slalom, Torpedoes, Return Home). Targeted at high school students for outreach events. A completely different game could be made, but discuss with other team members in charge.

## Original HTML Files
The original HTML files this project was converted from: [[Google Drive Link](https://drive.google.com/drive/folders/1lwm2kFyv2mu5-dl5pmftahDj8OP2QDkp?usp=drive_link)]

## Future Goals
- Add real team photos and member info to Team and Alumni pages
- Add real application link to Apply page
- Implement Quest 3 AR using three.js. (Will require a lot of code change).
- Add remaining RoboSub tasks to the game as Kelpie implements them (Tasks 3, 5)
- Deploy publicly once approved by the team
- Add site search functionality (required for RoboSub website scoring criteria)
- Add test event summaries and build documentation (required for RoboSub website scoring)
- [RoboSub Handbook](https://robonation.org/app/uploads/sites/4/2025/04/2025-RoboSub_Team-Handbook-04_25_25.pdf) (2026 might have come out after I pushed this)