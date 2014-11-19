import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JButton;
import javax.swing.JPanel;
import javax.swing.JTextField;

public class MenuBar extends JPanel implements ActionListener {

	JButton generateExample;
	JTextField exampleOutput;

	public MenuBar() {
		generateExample = new JButton("Generate Example Problem");
		exampleOutput = new JTextField(20);

		generateExample.addActionListener(this);

		add(generateExample);
		add(exampleOutput);
	}

	@Override
	public void actionPerformed(ActionEvent ae) {
		if (ae.getSource() == generateExample) {
			String eq = generateEquation();
			exampleOutput.setText(eq);
		}
	}

	public String generateEquation() {
		return "-3x+2=8";
	}
}
