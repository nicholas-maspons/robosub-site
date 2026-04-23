# How to View Website

1. Open a terminal and navigate to where you want the project saved
2. git clone https://github.com/nicholas-maspons/robosub-site.git
3. In the Terminal: cd into the subfolder that is now present "cd robosub-site"
4. In the Terminal: npm run dev -- --host     
  - The Meta headset is connected to the "nyu" WiFi, and --host allows people on the same WiFi to view this locally hosted website by visiting the URL seen in the terminal after running this command. You will see "Local: http://..." and "Network: http://..."
  In short: use the Network URL, not the local
5. Type the Network URL and you will now be able to view the website

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