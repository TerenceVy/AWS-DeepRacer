import numpy as np

import cv2
import motor
import car_dir

import time

video_capture = cv2.VideoCapture(-1)

video_capture.set(3, 160)
video_capture.set(4, 120)
busnum = 1

motor.setup(busnum=busnum)
car_dir.setup(busnum=busnum)
car_dir.calibrate(-72)

motor.setSpeed(35)
motor.backward()
#motor.stop()
lastTurn = "Right"

while(True):
    ret, frame = video_capture.read()

    crop_img = frame

    if ret is True:
        hsv = cv2.cvtColor(crop_img, cv2.COLOR_BGR2HSV)
    else:
        continue
    
    lower_color = np.array([0, 40, 40])
    upper_color = np.array([30, 255, 255])

    mask = cv2.inRange(hsv, lower_color, upper_color)
    
    blur = cv2.GaussianBlur(mask,(5,5),0) 

    ret,thresh = cv2.threshold(blur,60,255,cv2.THRESH_BINARY_INV)

    contours,hierarchy = cv2.findContours(thresh.copy(), 1, cv2.CHAIN_APPROX_NONE)

    car_dir.setPWMTurn(375, 525)
    if len(contours) > 1:
        motor.backward()
        c = max(contours, key=cv2.contourArea)
        M = cv2.moments(c)
        cx = int(M['m10']/M['m00'])
        cy = int(M['m01']/M['m00'])

        cv2.line(crop_img,(cx,0),(cx,720),(255,0,0),1)

        cv2.line(crop_img,(0,cy),(1280,cy),(255,0,0),1) 

        cv2.drawContours(crop_img, contours, -1, (0,255,0), 1)

        if cx >= 83:
            motor.setSpeed(35)
            car_dir.setPWMTurn(350, 550)
            car_dir.turn_left()
            lastTurn = "Left"

        if cx < 83 and cx > 70:
            car_dir.home()
            motor.setSpeed(35)

        if cx <= 70:
            car_dir.setPWMTurn(350, 550)
            lastTurn = "Right"
            motor.setSpeed(35)
            car_dir.turn_right()
    else:
        print("lastTurn :"+lastTurn)
        motor.setSpeed(30)
        car_dir.setPWMTurn(350, 550)
        if lastTurn != "None":
            if lastTurn == "Right":
                car_dir.turn_right()
            else:
                car_dir.turn_left()
                
    cv2.imshow('frame', crop_img)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        motor.stop()
        break
