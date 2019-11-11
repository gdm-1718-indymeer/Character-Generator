import firebase_admin
from firebase_admin import db
from firebase_admin import credentials



from sense_hat import SenseHat
from time import sleep

sense  = SenseHat()
sense.clear()
sense.set_rotation(180)
cred = credentials.Certificate("character-generator-3420c-firebase-adminsdk-o7i58-6df5428789.json")
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://character-generator-3420c.firebaseio.com/'
})

ref = db.reference('/character')
snapshot = ref.get()
AllCharacters = []

X = [255, 0, 0]  # Red
O = [255, 255, 255]  # White

def listener(event):
    #print(event.data["loop"])  # new data at /reference/event.path. None if deleted
    if event.data["loop"] == True:
        print('its true')
        loopCharacters()
        db.reference('/pi').set({
            "loop" : False
        })
        
db.reference('/pi').listen(listener)


def loopCharacters():
    for key, val in snapshot.items():
        #print('{0} => {1}'.format(key, val))
        AllCharacters = []
        for i in val:        
            if i == 0:
                AllCharacters.append(O)
            elif i == 1:
                AllCharacters.append(X)
        sense.set_pixels(AllCharacters)
        sleep(4)
        sense.clear()
    sense.clear()


   