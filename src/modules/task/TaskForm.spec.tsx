import { mount } from "@cypress/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { ITask } from "../../shared/interface/interface.js";
import { TaskForm } from "./TaskForm.tsx";

describe("TaskForm", () => {
  const mockTask: ITask = {
    id: "1",
    title: "Tarefa existente",
    description: "Descrição existente",
    status: "PENDING",
    priority: "MEDIUM",
    dueDate: "2025-04-10",
  } as const;

  let mockOnCancel: sinon.SinonStub;

  beforeEach(() => {
    mockOnCancel = cy.stub().as("onCancel");
  });

  context("When rendered for creating a task", () => {
    beforeEach(() => {
      mount(
        <QueryClientProvider client={new QueryClient()}>
          <TaskForm onCancel={mockOnCancel} />
        </QueryClientProvider>
      );
    });

    it('Should display title "Nova Tarefa"', () => {
      cy.contains("Nova Tarefa").should("be.visible");
    });

    it("Should have empty fields", () => {
      cy.get("#title").should("have.value", "");
      cy.get("#description").should("have.value", "");
    });

    it("Should be able to cancel task creation", () => {
      cy.get("form").submit();
      cy.get("#title").should("have.value", "");
    });

    it("Should be enabled to create a new task", () => {
      cy.get("#title").type("Nova tarefa");
      cy.get("#description").type("Descrição da tarefa");
      cy.get("#status").select("IN_PROGRESS");
      cy.get("#priority").select("HIGH");
      cy.get("#dueDate").type("2025-04-20");

      cy.get("form").submit();
    });
  });

  context("When rendered for editing a task", () => {
    beforeEach(() => {
      mount(
        <QueryClientProvider client={new QueryClient()}>
          <TaskForm onCancel={mockOnCancel} task={mockTask} />
        </QueryClientProvider>
      );
    });

    it('Should display title "Editar Tarefa"', () => {
      cy.contains("Editar Tarefa").should("be.visible");
    });

    it("Should have fields filled with task data", () => {
      cy.get("#title").should("have.value", mockTask.title);
      cy.get("#description").should("have.value", mockTask.description);
      cy.get("#status").should("have.value", mockTask.status);
    });

    it("Should be able to update task", () => {
      cy.get("#title").clear().type("Título atualizado");
      cy.get("form").submit();

      cy.get("#title").should("have.value", "Título atualizado");
    });
  });
});
