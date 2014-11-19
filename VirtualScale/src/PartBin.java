import java.awt.Color;
import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.Rectangle;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JButton;
import javax.swing.JLabel;
import javax.swing.JPanel;

public class PartBin extends JPanel implements ActionListener {

	JButton addXTerm, addConstantTerm;
	AddTermListener apl;


	public PartBin(AddTermListener apl) {
		this.apl = apl;
		setBackground(Color.lightGray);
		setPreferredSize(new Dimension(200, 0)); // height doesn't matter here

		addXTerm = new JButton("Add X Bin");
		addConstantTerm = new JButton("Add New Constant Term");

		addXTerm.addActionListener(this);
		addConstantTerm.addActionListener(this);

		add(addXTerm);
		add(addConstantTerm);

	}


	@Override
	public void actionPerformed(ActionEvent ae) {
		if (ae.getSource() == addXTerm) {
			apl.addX();
		} else if (ae.getSource() == addConstantTerm) {
			apl.addConstant();
		}

	}

}
