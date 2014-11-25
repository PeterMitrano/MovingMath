import java.awt.Dimension;
import java.awt.Font;

import javax.swing.JPanel;
import javax.swing.JTextField;

public class MenuBar extends JPanel {

	static JTextField exampleOutput;

	public MenuBar() {
		exampleOutput = new JTextField("Type equation here", 20);
		exampleOutput.setFont(new Font("SansSerif", Font.BOLD, 40));
		exampleOutput.setHorizontalAlignment(JTextField.CENTER);
		exampleOutput.setPreferredSize(new Dimension(100, 100));
		add(exampleOutput);
	}
}
