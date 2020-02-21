import React from 'react';
import { Container, Form, Input, Icon } from 'semantic-ui-react';
import './style.scss';

const QuestionsForm = ({
  resetPasswordData,
  onInputChange,
  screenTwo,
}) => {
  const { errors, handleNext, clearError } = screenTwo;

  return (
    <div className="questions-form">
      <p className="text-darken-blue white-space-nowrap">
        Kindly provide answers to these questions
      </p>

      <Container>
        <Form>
          <Form.Field>
            <span className="question white-space-nowrap text-darken-blue">
              <Icon name="circle" className="text-primary" /> What is
              the name of your favorite car?
            </span>
            <Input type="text" placeholder="Your answer" />
          </Form.Field>
          <Form.Field>
            <span className="question white-space-nowrap text-darken-blue">
              <Icon name="circle" className="text-primary" /> What is
              the name of your favorite car?
            </span>
            <Input type="text" placeholder="Your answer" />
          </Form.Field>
          <Form.Field>
            <span className="question white-space-nowrap text-darken-blue">
              <Icon name="circle" className="text-primary" /> What is
              the name of your favorite car?
            </span>
            <Input type="text" placeholder="Your answer" />
          </Form.Field>

          <Form.Button
            type="Next"
            primary
            onClick={() => handleNext()}
          >
            next
          </Form.Button>
        </Form>
      </Container>
    </div>
  );
};

export default QuestionsForm;
