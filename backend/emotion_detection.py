import tensorflow as tf
import keras
from keras import layers
import cv2
import os
import numpy as np
import matplotlib.pyplot as plt
import random
import ssl

# ssl._create_default_https_context = ssl._create_unverified_context
directory = "data/"
classes = ['angry', 'disgust', 'fear', 'happy', 'neutral', 'sad', 'surprise']
img_size = 224
training_data = []

def generate_training_data():

    for category in classes:
        path = os.path.join(directory, category)
        class_num = classes.index(category)
        for img in os.listdir(path):
            arr = cv2.resize(cv2.imread(os.path.join(path, img)), (img_size, img_size))
            training_data.append([arr, class_num])


    random.shuffle(training_data)

def create_inputs():
    X = []
    y = []
    for features, label in training_data:
        X.append(features)
        y.append(label)
    X = np.array(X).reshape((-1, img_size, img_size, 3))
    X = X / 255.0
    y = np.array(y)
    return (X, y)


def train_model(X, y):
    model = keras.applications.MobileNetV2()

    # transfer learning - tuning, weights will start from last check point
    base_input = model.layers[0].input
    base_output = model.layers[-2].output

    final_output = layers.Dense(128)(base_output)  ## adding new layer, after the output of global pooling layer
    final_ouput = layers.Activation('relu')(final_output) ## activation function
    final_output = layers.Dense(64)(final_ouput)
    final_ouput = layers.Activation('relu')(final_output)
    final_output = layers.Dense(7, activation='softmax')(final_ouput)  ## my classes are 7, classification layer
    new_model = keras.Model(inputs=base_input, outputs=final_output)
    new_model.compile(loss="sparse_categorical_crossentropy", optimizer="adam", metrics=["accuracy"])
    new_model.fit(X, y, epochs=25)
    model.save('emotion_model.keras')


def complete_run():
    generate_training_data()
    inputs = create_inputs()
    train_model(inputs[0], inputs[1])

if __name__ == '__main__':
    complete_run()
