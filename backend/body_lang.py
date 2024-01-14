import tensorflow as tf
import numpy as np
from matplotlib import pyplot as plt
import cv2
import asyncio
from fer import FER

EDGES = {
    (0, 1): 'm',
    (0, 2): 'c',
    (1, 3): 'm',
    (2, 4): 'c',
    (0, 5): 'm',
    (0, 6): 'c',
    (5, 7): 'm',
    (7, 9): 'm',
    (6, 8): 'c',
    (8, 10): 'c',
    (5, 6): 'y',
    (5, 11): 'm',
    (6, 12): 'c',
    (11, 12): 'y',
    (11, 13): 'm',
    (13, 15): 'm',
    (12, 14): 'c',
    (14, 16): 'c'
}

emotion_detector = FER(mtcnn=True)


def analyze(arr):
    analysis = emotion_detector.detect_emotions(arr)[0]['emotions']
    print(analysis)
    # await asyncio.sleep(2)  # Simulate an asynchronous operation (sleep for 2 seconds)

    # return int(analysis * 100)
    return analysis

WRIST_INDICES = [10, 11]

async def body_lang():
    interpreter = tf.lite.Interpreter(model_path="3.tflite")
    interpreter.allocate_tensors()

    cap = cv2.VideoCapture(0)

    body_lang_score = 0

    emotion_count = {'happy': 0, 'sad': 0, 'disgusted': 0, 'surprise': 0, 'fear': 0, 'neutral': 0, 'angry': 0}

    count = 0
    while cap.isOpened():
        ret, frame = cap.read()

        # Reshape image
        img = frame.copy()

        # analyze emotion detection
        if img is not None and count > 50:
            result = await analyze(img)
            dominant_emotion = max(result, key=lambda x: result[x])
            emotion_count[dominant_emotion] += 1



        img = tf.image.resize_with_pad(np.expand_dims(img, axis=0), 192, 192)



        
        input_image = tf.cast(img, dtype=tf.float32)

        # Get input and output tensors
        input_details = interpreter.get_input_details()
        output_details = interpreter.get_output_details()
        
        # Make predictions
        input_tensor_index = input_details[0]['index']
        output_tensor_index = output_details[0]['index']
        

        interpreter.set_tensor(input_tensor_index, np.array(input_image))
        interpreter.invoke()
        keypoints_with_scores = interpreter.get_tensor(output_tensor_index)

        # Rendering
        body_lang_score += draw_keypoints(frame, keypoints_with_scores, 0.4)
        draw_connections(frame, keypoints_with_scores, EDGES, 0.4)
        cv2.imshow('Body Lang', frame)

        if cv2.waitKey(10) & 0xFF == ord('q'):
            print(emotion_count)
            break
        count += 1

    cap.release()
    cv2.destroyAllWindows()
    print(body_lang_score)
    final_result = emotion_count
    final_result['body_lang'] = body_lang_score
    return final_result

def draw_keypoints(frame, keypoints, confidence_threshold) -> int:
    y, x, c = frame.shape
    shaped = np.squeeze(np.multiply(keypoints, [y,x,1]))
    body_lang_score = 0
    for kp_index in WRIST_INDICES:
        ky, kx, kp_conf = shaped[kp_index]
        if kp_conf > confidence_threshold:
            body_lang_score+=1
            cv2.circle(frame, (int(kx), int(ky)), 4, (0,255,0), -1)
    return body_lang_score

def draw_connections(frame, keypoints, edges, confidence_threshold):
    y, x, c = frame.shape
    shaped = np.squeeze(np.multiply(keypoints, [y,x,1]))

    for edge, color in edges.items():
        p1, p2 = edge
        y1, x1, c1 = shaped[p1]
        y2, x2, c2 = shaped[p2]

        if (c1 > confidence_threshold) & (c2 > confidence_threshold):      
            cv2.line(frame, (int(x1), int(y1)), (int(x2), int(y2)), (0,0,255), 4)

if __name__ == "__main__":
    asyncio.run(body_lang())