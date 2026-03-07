import React from 'react';
import { render, screen } from '@testing-library/react';
import SkillTree from './SkillTree';

describe('SkillTree', () => {
  const mockSkills = [
    { id: 1, name: 'Boil Water', description: 'Learn to boil water', level: 1 },
    { id: 2, name: 'Sauté Vegetables', description: 'Learn to sauté', level: 2 },
    { id: 3, name: 'Roast Chicken', description: 'Learn to roast', level: 3 },
  ];

  test('renders skill tree with locked and unlocked nodes', () => {
    render(<SkillTree skills={mockSkills} currentLevel={1} />);

    expect(screen.getByText('Skill Tree')).toBeInTheDocument();
    expect(screen.getByText('Boil Water')).toBeInTheDocument();
    expect(screen.getByText('Sauté Vegetables')).toBeInTheDocument();
    expect(screen.getByText('Roast Chicken')).toBeInTheDocument();

    // Check for lock icons on locked skills
    const skillNodes = screen.getAllByRole('heading', { level: 3 });
    skillNodes.forEach(node => {
      const skillName = node.textContent;
      if (skillName === 'Boil Water') {
        expect(node.closest('.skill-node')).not.toHaveClass('locked');
      } else {
        expect(node.closest('.skill-node')).toHaveClass('locked');
      }
    });
  });

  test('renders all skills as unlocked when currentLevel is high enough', () => {
    render(<SkillTree skills={mockSkills} currentLevel={3} />);

    const skillNodes = screen.getAllByRole('heading', { level: 3 });
    skillNodes.forEach(node => {
      expect(node.closest('.skill-node')).not.toHaveClass('locked');
    });
  });
});
