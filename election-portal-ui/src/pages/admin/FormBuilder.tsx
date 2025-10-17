import { useState, useEffect } from 'react';
import { formsApi, type Form } from '../../services/api';

interface Question {
  id: string;
  label: string;
  type: 'text' | 'number' | 'dropdown';
  options?: string[];
}

export default function FormBuilder() {
  const [forms, setForms] = useState<Form[]>([]);
  const [formName, setFormName] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question>({
    id: '',
    label: '',
    type: 'text',
    options: [],
  });
  const [optionInput, setOptionInput] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadForms();
  }, []);

  const loadForms = async () => {
    try {
      const data = await formsApi.getAll();
      setForms(data);
    } catch (error) {
      console.error('Error loading forms:', error);
    }
  };

  const addQuestion = () => {
    if (currentQuestion.id && currentQuestion.label) {
      setQuestions([...questions, { ...currentQuestion }]);
      setCurrentQuestion({
        id: '',
        label: '',
        type: 'text',
        options: [],
      });
      setOptionInput('');
    }
  };

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const addOption = () => {
    if (optionInput.trim()) {
      setCurrentQuestion({
        ...currentQuestion,
        options: [...(currentQuestion.options || []), optionInput.trim()],
      });
      setOptionInput('');
    }
  };

  const removeOption = (index: number) => {
    setCurrentQuestion({
      ...currentQuestion,
      options: currentQuestion.options?.filter((_, i) => i !== index),
    });
  };

  const saveForm = async () => {
    if (!formName || questions.length === 0) {
      alert('Please provide a form name and at least one question');
      return;
    }

    setLoading(true);
    try {
      await formsApi.create({
        name: formName,
        schemaJSON: { questions },
      });
      
      alert('Form created successfully!');
      setFormName('');
      setQuestions([]);
      setShowPreview(false);
      loadForms();
    } catch (error) {
      console.error('Error creating form:', error);
      alert('Error creating form');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Form Builder</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Form Creator */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Create New Form</h2>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Form Name
            </label>
            <input
              type="text"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Ballot Design Form"
            />
          </div>

          <div className="border-t pt-4 mb-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Add Question</h3>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Question ID
                </label>
                <input
                  type="text"
                  value={currentQuestion.id}
                  onChange={(e) => setCurrentQuestion({ ...currentQuestion, id: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., q1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Question Label
                </label>
                <input
                  type="text"
                  value={currentQuestion.label}
                  onChange={(e) => setCurrentQuestion({ ...currentQuestion, label: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Contest Name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Question Type
                </label>
                <select
                  value={currentQuestion.type}
                  onChange={(e) => setCurrentQuestion({ 
                    ...currentQuestion, 
                    type: e.target.value as 'text' | 'number' | 'dropdown',
                    options: e.target.value === 'dropdown' ? [] : undefined
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="text">Text</option>
                  <option value="number">Number</option>
                  <option value="dropdown">Dropdown</option>
                </select>
              </div>

              {currentQuestion.type === 'dropdown' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Dropdown Options
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={optionInput}
                      onChange={(e) => setOptionInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addOption())}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter option"
                    />
                    <button
                      onClick={addOption}
                      className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                    >
                      Add
                    </button>
                  </div>
                  <div className="space-y-1">
                    {currentQuestion.options?.map((option, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded">
                        <span className="text-sm">{option}</span>
                        <button
                          onClick={() => removeOption(index)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={addQuestion}
              className="w-full mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Add Question
            </button>
          </div>

          {questions.length > 0 && (
            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">
                Questions ({questions.length})
              </h3>
              <div className="space-y-2 mb-4">
                {questions.map((q, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                    <div>
                      <span className="font-medium">{q.id}:</span> {q.label}
                      <span className="text-sm text-gray-600 ml-2">({q.type})</span>
                    </div>
                    <button
                      onClick={() => removeQuestion(index)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition"
                >
                  {showPreview ? 'Hide' : 'Show'} Preview
                </button>
                <button
                  onClick={saveForm}
                  disabled={loading}
                  className="flex-1 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition disabled:bg-gray-400"
                >
                  {loading ? 'Saving...' : 'Save Form'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Preview & Existing Forms */}
        <div className="space-y-6">
          {showPreview && questions.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Preview</h2>
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold mb-4">{formName || 'Untitled Form'}</h3>
                <pre className="text-sm bg-gray-800 text-green-400 p-4 rounded overflow-x-auto">
                  {JSON.stringify({ questions }, null, 2)}
                </pre>
              </div>
            </div>
          )}

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Existing Forms</h2>
            {forms.length === 0 ? (
              <p className="text-gray-600">No forms created yet.</p>
            ) : (
              <div className="space-y-3">
                {forms.map((form) => (
                  <div key={form.formId} className="border border-gray-200 p-4 rounded-lg hover:shadow-md transition">
                    <h3 className="font-semibold text-gray-800">{form.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {form.schemaJSON?.questions?.length || 0} questions
                    </p>
                    <details className="mt-2">
                      <summary className="text-sm text-blue-600 cursor-pointer hover:text-blue-800">
                        View Schema
                      </summary>
                      <pre className="text-xs bg-gray-50 p-2 rounded mt-2 overflow-x-auto">
                        {JSON.stringify(form.schemaJSON, null, 2)}
                      </pre>
                    </details>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

