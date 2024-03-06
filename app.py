from flask import Flask, render_template, request, jsonify
import os
import base64

app = Flask(__name__)

# Directory to save signature images
UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/save-signature', methods=['POST'])
def save_signature():
    data = request.json
    signature = data.get('signature')

    if not signature:
        return jsonify({'error': 'Signature data is required'}), 400

    # Decode base64 image data
    image_data = base64.b64decode(signature.split(',')[1])

    # Save image to file
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], 'signature.png')
    with open(file_path, 'wb') as f:
        f.write(image_data)

    return jsonify({'success': True, 'file_path': file_path}), 200

if __name__ == '__main__':
    app.run(debug=True)
