import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;

import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JTextField;

public class XTerm extends Term implements MouseListener {

	JLabel xLabel;
	public static double weight;
	public double coefficient;

	public XTerm(RemoveTermListener removeTermListener) {
		super(removeTermListener);
		setup();
	}

	public XTerm(RemoveTermListener removeTermListener, int x, int y) {
		super(removeTermListener, x, y);
		setup();
	}

	public void setup() {
		addMouseListener(this);
		coefficientField.setText("1");
		coefficientField.setHorizontalAlignment(JTextField.RIGHT);
		coefficientField.setLocation(5, 0);
		coefficientField.setSize(20, W);
		xLabel = new JLabel("X");
		xLabel.setFont(new Font("SansSerif", Font.BOLD, 16));
		xLabel.setHorizontalAlignment(JTextField.CENTER);
		xLabel.setBounds(W - 30, 0, 20, W);
		add(xLabel);
	}

	@Override
	protected void paintComponent(Graphics g) {
		super.paintComponent(g);
		Graphics2D g2 = (Graphics2D) g;

		if (coefficient == 0) {
			g2.setColor(Color.white);
		} else if (coefficient < 0) {
			g2.setColor(Color.red);
		} else {
			g2.setColor(Color.blue);
		}

		g2.fill(circle);
	}

	@Override
	public double updateWeight() {
		String val = ScalePanel.xVal.getText().toString();
		XTerm.weight = Double.parseDouble(val);
		coefficient = Integer.parseInt(coefficientField.getText());
		return XTerm.weight * coefficient;

	}

	@Override
	public void mouseClicked(MouseEvent me) {
		if (me.getClickCount() == 2) {
			removeTermListener.removeTerm(this);
		} else if (me.getClickCount() == 1) {
			XTerm.weight *= -1;
			repaint();
		}
	}

	public XTerm cloneMe(int x, int y) {
		XTerm x1 = new XTerm(removeTermListener, x, y);
		x1.coefficient = this.coefficient;
		return x1;
	}
}
