const BASE_URL = 'http://localhost:3000/'; // Cambia esto por tu endpoint base

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const err = new Error(errorData.error || errorData.message || `Error ${response.status}`);
    // Adjuntar información útil para el frontend
    err.status = response.status;
    err.body = errorData;
    err.code = errorData.code;
    err.details = errorData.details;
    throw err;
  }
  return response.json();
};

const getJSON = async (endpoint) => {
  try {
    const token = localStorage.getItem('token')
    const headers = { 'Content-Type': 'application/json' }
    if (token) headers['Authorization'] = `Bearer ${token}`
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'GET',
      headers,
    })
    return await handleResponse(response);
  } catch (error) {
    console.error('GET error:', error.message);
    throw error;
  }
};

const postJSON = async (endpoint, data) => {
  try {
    const token = localStorage.getItem('token');
    const headers = { 'Content-Type': 'application/json' }
    const isFormData = typeof FormData !== 'undefined' && data instanceof FormData;
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers,
      body: isFormData ? data : JSON.stringify(data),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('POST error:', error.message);
    throw error;
  }
};

const putJSON = async (endpoint, data) => {
  try {
    const token = localStorage.getItem('token')
    const headers = { 'Content-Type': 'application/json' }
    if (token) headers['Authorization'] = `Bearer ${token}`
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(data),
    })
    return await handleResponse(response);
  } catch (error) {
    console.error('PUT error:', error.message);
    throw error;
  }
};

const deleteJSON = async (endpoint) => {
  try {
    const token = localStorage.getItem('token')
    const headers = { 'Content-Type': 'application/json' }
    if (token) headers['Authorization'] = `Bearer ${token}`
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers,
    })
    return await handleResponse(response);
  } catch (error) {
    console.error('DELETE error:', error.message);
    throw error;
  }
};

export { getJSON, postJSON, putJSON, deleteJSON };